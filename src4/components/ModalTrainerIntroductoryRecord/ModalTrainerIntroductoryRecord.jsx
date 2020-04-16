import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../Calendar';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '/introductory/add-demo',
        addData: '',
        title: '',
        inputs: [
            {
                title: 'ФИО',
                postArg: 'name',
                mandatory: true
            },
            {
                title: 'Телефон',
                postArg: 'phone',
                mandatory: true
            }
        ],
        time: {
            free: [],
            postArg: 'time'
        },
        secondInput: {
            title: 'Причина(кратко)',
            postArg: 'comment',
            mandatory: false
        },
        values: {
            inputs: ['', ''],
            secondInput: [''],
            time: ''
        },
        errors: {
            secondInput: false,
            inputs: [],
            time: false
        },
        errorBack: '',
        activeDate: {
            day: 1,
            month: 1,
            year: 1
        },
        dataList: { green: [], blue: [], yellow: [] }
    };
    componentDidMount() {
        const now = new Date();
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        const date = 'date=' + now.getFullYear() + '-' + (1 + now.getMonth());
        const url = '/main/trainer-get-all-days';
        fetch(url, {
            method: 'POST',
            body: date,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((fulDays) => {
                let data =
                    'date=' +
                    now.getFullYear() +
                    '-' +
                    (1 + now.getMonth()) +
                    '-' +
                    now.getDate();
                console.log(data);
                fetch('/client-trainer/training/get-time-for-record', {
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Request-Headers':
                            'X-Requested-With, Origin',
                        Origin: 'https://localhost:3000/'
                    }
                }) //dev
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        const time = {
                            free: data,
                            postArg: 'hour'
                        };
                        console.log(time);
                        this.setState({
                            dataList: fulDays.days,
                            activeDate: {
                                year: now.getFullYear(),
                                month: 1 + now.getMonth(),
                                day: now.getDate()
                            },
                            time
                        });
                    });
            });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    handleTextChange = (event) => {
        const [index, type] = event.target.name.split('_');
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        console.log(index, type, values);
        values[type][index] = event.target.value;
        errors.inputs[index] = false;
        this.setState({ values, errors });
    };
    handleTimeChange = (event) => {
        const timeValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.time = timeValue;
        errors.time = false;
        console.log(this.state);
        this.setState({ values, errors });
    };
    handleSave = () => {
        const {
            url,
            inputs,
            values,
            errors,
            addData,
            activeDate,
            time
        } = this.state;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));
        inputs.forEach((item, i) => {
            if (values.inputs[i]) {
                data += item.postArg + '=' + values.inputs[i] + '&';
                newErrors.inputs[i] = false;
            } else {
                if (item.mandatory) {
                    newErrors.inputs[i] = true;
                }
            }
        });
        if (time.free.length !== 0) {
            if (values.time) {
                data += time.postArg + '=' + values.time + '&';
                newErrors.time = false;
            } else {
                newErrors.time = true;
            }
        }
        data +=
            'date=' +
            activeDate.year +
            '-' +
            activeDate.month +
            '-' +
            activeDate.day +
            '&';
        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = newErrors.inputs.filter((error) => error === true)
            .length;
        if (newErrors.time === true) {
            countErrors++;
        }
        countErrors === 0
            ? this.send(url, data)
            : this.setState({ errors: newErrors });
    };
    send(url, data) {
        const { handleModal } = this.props;
        console.log('' + url);
        console.log(data);
        fetch('' + url, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                if (data.error) {
                    this.setState({
                        errorBack: data.error
                    });
                    console.log(data);
                } else {
                    handleModal(false);
                }
            });
    }
    handleChange = (data) => {
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            let date = 'date=' + data.year + '-' + data.month + '-' + data.day;
            console.log(data);
            fetch('/client-trainer/training/get-time-for-record', {
                method: 'POST',
                body: date,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            }) //dev
                .then((result) => {
                    return result.json();
                })
                .then((date) => {
                    const time = {
                        free: date,
                        postArg: 'hour'
                    };
                    console.log(time);
                    this.setState({
                        activeDate: data,
                        time
                    });
                });
        } else {
            const date = 'date=' + data.year + '-' + data.month;
            const url = '/main/trainer-get-all-days';
            fetch(url, {
                method: 'POST',
                body: date,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((fulDays) => {
                    this.setState({
                        dataList: fulDays.days,
                        activeDate: data
                    });
                    console.log(this.state);
                });
        }
    };
    render() {
        const { handleModal } = this.props;
        const {
            title,
            errors,
            values,
            inputs,
            errorBack,
            activeDate,
            dataList,
            time
        } = this.state;
        console.log(errors);
        const freeTimeNone = time.free.some((item) => item);
        console.log(freeTimeNone);
        return ReactDOM.createPortal(
            <section className="modal-trainer-introductory-call">
                <h3>{title}</h3>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={dataList}
                ></Calendar>
                {freeTimeNone ? (
                    <div
                        className={
                            'modal-trainer-clients-list__List modal-trainer-clients-list_low ' +
                            (errors.time && 'modal-trainer-clients-list__error')
                        }
                    >
                        {time.free.map(
                            (input, index) =>
                                input && (
                                    <div
                                        key={
                                            index +
                                            '-modal-trainer-clients-list-list'
                                        }
                                        className={
                                            'modal-trainer-clients-list__List-item ' +
                                            (errors.time &&
                                                'modal-trainer-clients-list__error')
                                        }
                                    >
                                        <input
                                            id={
                                                index +
                                                '-modal-trainer-clients-list-list-time'
                                            }
                                            className={
                                                errors.time &&
                                                'modal-trainer-clients-list__error'
                                            }
                                            onChange={this.handleTimeChange}
                                            name={'time'}
                                            type="radio"
                                            value={index}
                                        />
                                        <label
                                            htmlFor={
                                                index +
                                                '-modal-trainer-clients-list-list-time'
                                            }
                                        >
                                            {index < 10
                                                ? '0' + index + ' : 00'
                                                : index + ' : 00'}
                                        </label>
                                    </div>
                                )
                        )}
                    </div>
                ) : (
                    'Нет доступного времени'
                )}
                {inputs.length !== 0 && (
                    <div className="modal-trainer-introductory-call__input">
                        {inputs.map((input, index) => (
                            <input
                                className={
                                    errors.inputs[index] &&
                                    'modal-trainer-introductory-call__error'
                                }
                                onChange={this.handleTextChange}
                                key={
                                    index +
                                    '-modal-trainer-introductory-call-input'
                                }
                                name={index + '_inputs_' + index.postArg}
                                placeholder={input.title}
                                type="text"
                                value={values.inputs[index]}
                            />
                        ))}
                    </div>
                )}

                {errorBack}
                <div className="modal-trainer-introductory-call__buttons">
                    <button onClick={this.handleSave}>Готово</button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}