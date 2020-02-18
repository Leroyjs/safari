import React, { Component } from 'react';
import './style.css';
let array = [
    {
        waist: '12',
        hips: '12',
        arm: '23',
        chest: '34',
        legs: '45',
        data: '01.12'
    },
    {
        waist: '12',
        hips: '12',
        arm: '23',
        chest: '34',
        legs: '45',
        data: '01.12'
    }
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // },
    // {
    //     waist: '12',
    //     hips: '12',
    //     arm: '23',
    //     chest: '34',
    //     legs: '45',
    //     data: '01.12'
    // }
];
export default class Volume extends Component {
    constructor(props) {
        super(props);
        this.tableMain = React.createRef();
    }
    componentDidMount() {
        const { anthropometry } = this.props;
        const tableMain = this.tableMain.current;
        let emptyBlocks = 6 - array.length;
        for (let i = 0; i < emptyBlocks; i++) {
            let div = document.createElement('div');
            div.classList.add('volume__table-main-column');
            div.innerHTML =
                '<div class="volume__table-main-item volume__table-main-item_data ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>' +
                '<div class="volume__table-main-item  ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>' +
                '<div class="volume__table-main-item ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>' +
                '<div class="volume__table-main-item ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>' +
                '<div class="volume__table-main-item ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>' +
                '<div class="volume__table-main-item ' +
                (anthropometry && 'table-anthropometry__table') +
                '"></div>';
            tableMain.append(div);
        }
    }
    render() {
        const { anthropometry } = this.props;
        return (
            <section
                className={
                    'volume' + ' ' + (anthropometry && 'table-anthropometry')
                }
            >
                <h2>Объемы (см)</h2>
                <div
                    className={
                        'volume__table' +
                        ' ' +
                        (anthropometry && 'table-anthropometry__table')
                    }
                >
                    <div className="volume__table-name ">
                        <div
                            className={
                                'volume__table-name-item volume__table-name-item_data ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Дата</h4>
                        </div>
                        <div
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Талия</h4>
                        </div>
                        <div
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Бедро</h4>
                        </div>
                        <div
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Руки</h4>
                        </div>
                        <div
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Грудь</h4>
                        </div>
                        <div
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Ноги</h4>
                        </div>
                    </div>
                    <div ref={this.tableMain} className="volume__table-main">
                        {array.map((volum, index) => (
                            <div
                                key={index + 'column'}
                                className="volume__table-main-column"
                            >
                                <div
                                    key={index + 'data'}
                                    className="volume__table-main-item volume__table-main-item_data"
                                >
                                    <span>{volum.data}</span>
                                </div>
                                <div
                                    key={index + 'waist'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.waist}</span>
                                </div>
                                <div
                                    key={index + 'hips'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.hips}</span>
                                </div>
                                <div
                                    key={index + 'arm'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.arm}</span>
                                </div>
                                <div
                                    key={index + 'chest'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.chest}</span>
                                </div>
                                <div
                                    key={index + 'legs'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.legs}</span>
                                </div>
                            </div>
                        ))}
                        <div className="volume__table-main-column">
                            <div className="volume__table-main-item volume__table-main-item_data  ">
                                <span></span>
                            </div>
                            <div className="volume__table-main-item volume__table-main-item_plus">
                                <span>+</span>
                            </div>
                            <div className="volume__table-main-item volume__table-main-item_plus">
                                <span>+</span>
                            </div>
                            <div className="volume__table-main-item volume__table-main-item_plus">
                                <span>+</span>
                            </div>
                            <div className="volume__table-main-item volume__table-main-item_plus">
                                <span>+</span>
                            </div>
                            <div className="volume__table-main-item volume__table-main-item_plus">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
