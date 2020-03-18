import React, { Component } from 'react';
import ModalClientRecording from '../ModalClientRecording';
import ModalBuyWorkout from '../ModalBuyWorkout';
import './style.css';

export default class Statistics extends Component {
    state = {
        pageData: {
            numberWorkouts: '',
            block: '',
            assessment: '',
            nextWorkout: ''
        },
        modalRecord: false,
        modalBlock: false
    };

    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    handleModal = (modalRecord) => {
        this.setState({
            canUpate: true,
            modalRecord
        });
    };
    handleModalBlock = (modalBlock) => {
        this.setState({
            canUpate: true,
            modalBlock
        });
    };
    render() {
        const { button = true, update } = this.props;
        const { pageData = true, modalRecord, modalBlock } = this.state;
        return (
            <section className="statistics">
                <p>
                    Выполнено тренировок: <span>{pageData.numberWorkouts}</span>
                </p>
                <p>
                    Действующий блок: <span>{pageData.block}</span>
                    {button && !pageData.block && (
                        <button
                            onClick={() => this.handleModalBlock(true)}
                            className="statistics__buy"
                        >
                            Приобрести пт
                        </button>
                    )}
                </p>
                <p>
                    Средняя оценка тренировок:{' '}
                    <span>{pageData.assessment}</span>
                </p>
                <p>
                    Следующая тренировка: <span>{pageData.nextWorkout}</span>
                </p>
                {button && !pageData.nextWorkout && (
                    <button onClick={() => this.handleModal(true)}>
                        Записаться на тренировку
                    </button>
                )}
                {modalRecord && (
                    <ModalClientRecording
                        update={update}
                        handleModal={this.handleModal}
                    ></ModalClientRecording>
                )}

                {modalBlock && (
                    <ModalBuyWorkout
                        handleModal={this.handleModalBlock}
                        title="Приобрести ПТ"
                        addData=""
                        url="/training/buy"
                    ></ModalBuyWorkout>
                )}
            </section>
        );
    }
}
