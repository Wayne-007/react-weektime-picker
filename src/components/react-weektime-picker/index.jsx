import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

export const Index = props => {
    const DayTimes = 24 * 2;
    const weekTimesArr = [];
    for (let i = 0; i < DayTimes * 7; i++) {
        weekTimesArr.push(i)
    }
    let copy_preViewIndex = [];

    const [isMove, set_isMove] = useState(false);
    const [list, set_list] = useState([]);
    // eslint-disable-next-line
    const [weekTimes, set_weekTimes] = useState(weekTimesArr);
    // eslint-disable-next-line
    const [weekDays, set_weekDays] = useState(['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']);
    const [timeTextList, set_timeTextList] = useState([]); //显示的时间数组 ["00:00","00:30","01:00",...]
    const [startIndex, set_startIndex] = useState(0);
    const [axis, set_axis] = useState({});
    const [preViewIndex, set_preViewIndex] = useState([]);
    const [showTimeText, set_showTimeText] = useState([]);
    const [values, set_values] = useState(props.value || '');

    /**
 * 鼠标停留时提示当前时间段
 */
    const tiptxt = index => {
        let timeIndex = index % DayTimes;
        let weekIndex = ~~(index / DayTimes);
        return `${weekDays[weekIndex]} ${timeTextList[timeIndex]}~${timeTextList[timeIndex + 1]}`
    }
    /**
 * 初始化显示的时间数组
 * @return {Array} ["00:00","00:30","01:00",...]
 */
    const initTimeText = () => {
        let timeTextList = [], hours = [], minutes = ['00', '30'];
        for (let i = 0; i <= 24; i++) {
            i < 10 ? hours.push('0' + i) : hours.push(i.toString())
        }
        for (const hour of hours) {
            for (const minute of minutes) {
                timeTextList.push(`${hour}:${minute}`)
            }
        }
        return timeTextList
    }
    /**
 * 获取拖动鼠标选择的index数组
 */
    const getSelectIndex = () => {
        let indexList = [],
            newAxis = {
                startx: Math.min(axis.startx, axis.endx),
                starty: Math.min(axis.starty, axis.endy),
                endx: Math.max(axis.startx, axis.endx),
                endy: Math.max(axis.starty, axis.endy)
            };
        for (let y = newAxis.starty; y <= newAxis.endy; y++) {
            for (let x = newAxis.startx; x <= newAxis.endx; x++) {
                indexList.push(x + y * DayTimes)
            }
        }
        return indexList
    }
    const handleMousedown = event => {
        set_isMove(true);
        const that_startIndex = event.target.getAttribute('data-index');
        set_startIndex(that_startIndex)
        set_axis(Object.assign(axis, { startx: that_startIndex % DayTimes, starty: ~~(that_startIndex / DayTimes) }))
    }
    /**
* 展示选择的时间段
* @param {Array} list 已选择的list数组
*/
    const showSelectTime = list => {
        if (!Array.isArray(list)) return;
        let weeksSelect = [], listlength = list.length;
        // this.showTimeText = [];
        const that_showTimeText = [];
        set_showTimeText(that_showTimeText);
        if (listlength === 0) return;
        // 把 336长度的 list 分成 7 组，每组 48 个
        for (let i = 0; i < listlength; i += DayTimes) {
            weeksSelect.push(list.slice(i, i + DayTimes));
        }
        weeksSelect.forEach(item => {
            that_showTimeText.push(getTimeText(item))
        });
        set_showTimeText(that_showTimeText);
    }
    /**
* 设置选择的时间段并赋给绑定的值
* @param {Array} indexList 选择的index数组
*/
    const setSelectIndex = indexList => {
        if (!Array.isArray(indexList)) return;
        const listLength = indexList.length;
        const newData = list[startIndex] === '1' ? '0' : '1';
        let that_list = list;
        for (let i = 0; i < listLength; i++) {
            set_list(that_list.splice(indexList[i], 1, newData));
        }
        props.change_value && props.change_value(that_list.join(''));
        set_values(that_list.join(''));
        showSelectTime(that_list);
    }
    const resetMousemove = () => {
        if (!isMove) return;
        // setSelectIndex(preViewIndex);
        setSelectIndex(copy_preViewIndex);
        set_isMove(false);
        set_axis({});
        copy_preViewIndex = [];
        set_preViewIndex([]);
    }
    const handleMousemove = event => {
        if (!isMove) return;
        const index = event.target.getAttribute('data-index');
        set_axis(Object.assign(axis, { endx: index % DayTimes, endy: ~~(index / DayTimes) }))
        const res = getSelectIndex();
        copy_preViewIndex = res;
        set_preViewIndex(res);
    }
    const handleMouseup = event => {
        handleMousemove(event);
        resetMousemove();
    }
    const getTimeText = arrIndex => {
        if (!Array.isArray(arrIndex)) return "";

        /*方法一 matchAll 正则匹配 （速度较慢） */
        // let strIndex = arrIndex.join('');
        // let arrMatches = Array.from(strIndex.matchAll(/1+/g));
        // let timeText = "";
        // arrMatches.forEach(value => {
        //   timeText += this.timeTextList[value.index];
        //   timeText += '~' + this.timeTextList[value.index + value[0].length] + '、';
        // })
        /*方法一 end */

        /**方法二 循环 （速度是方法一的十倍+）*/
        let timeLength = arrIndex.length,
            isSelect = false,
            timeText = "";
        arrIndex.forEach((value, index) => {
            if (value === '1') {
                if (!isSelect) {
                    timeText += timeTextList[index]
                    isSelect = true;
                }
                if (index === timeLength - 1) timeText += '~' + timeTextList[index + 1] + '、';
            } else {
                if (isSelect) {
                    timeText += '~' + timeTextList[index] + '、'
                    isSelect = false;
                }
            }
        })
        /*方法二 end */

        return timeText.slice(0, -1)
    }





    const initList = value => {
        let reg = new RegExp("^[01]{" + weekTimes.length + "}$");
        let that_list = list;
        if (value && reg.test(value)) {
            that_list = value.split('');
            set_list(that_list);
            return showSelectTime(that_list);
        }
        that_list = new Array(weekTimes.length).fill('0');
        set_list(that_list);
        props.change_value && props.change_value(that_list.join(''));
        set_values(that_list.join(''));
        showSelectTime(that_list);
    }
    // eslint-disable-next-line
    useEffect(() => {
        set_timeTextList(initTimeText());
        document.addEventListener('mouseup', resetMousemove);
        initList(values)
    }, [])
    // eslint-disable-next-line
    useEffect(() => {
        // split() 方法用于把一个字符串分割成字符串数组。
        // join() 方法用于把数组中的所有元素放入一个字符串。
        if (values.split('') === list.join('')) return;
        initList(values);
    }, [values])

    return (
        <div className={styles.weektime}>
            <div className={styles.weektimeMain}>
                <div className={styles.weektimeHd}>
                    <div className={styles.weektimeHdTitle}>星期\时间</div>
                    <div className={styles.weektimeHdCon}>
                        <div className={styles.weektimeHdConTop}>
                            <div className={styles.weektimeDateRange}>00:00 - 12:00</div>
                            <div className={styles.weektimeDateRange}>12:00 - 24:00</div>
                        </div>
                        <div className={styles.weektimeHdConBottom}>
                            {hours.map(item => {
                                return (<span className={styles.weektimeDateCell} key={item}>{item - 1}</span>);
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.weektimeBd}>
                    <div className={styles.weekBody}>
                        {
                            weekDays.map(week => {
                                return (<div key={week} className={styles.weekItem}>{week}</div>);
                            })
                        }
                    </div>
                    <div className={styles.timeBody} onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove}>
                        {
                            // 全部小方块
                            weekTimes.map((i, key) => {
                                return (
                                    <div
                                        key={key}
                                        data-index={key}
                                        title={tiptxt(key)}
                                        className={`${styles.timeCell} ${values.split('')[key] === '1' ? styles.active : ''} ${preViewIndex.includes(key) || copy_preViewIndex.includes(key) ? styles.preActive : ''}`}
                                    >
                                    </div>
                                );
                            })
                        }
                    </div >
                </div >
            </div >
            <div className={styles.weektimeHelp}>
                <div className={styles.weektimeHelpTx}>
                    <div className={styles.weektimeHelpBd}>
                        <span className={styles.colorBox}></span>
                        <span className={styles.textBox}>未选</span>
                        <span className={`${styles.colorBox} ${styles.colorActive}`}></span>
                        <span className={styles.textBox}>已选</span>
                    </div>
                    <div className={styles.weektimeHelpFt} onClick={initList}>清空选择</div>
                </div>
                <div className={styles.weektimeHelpZelSct}>
                    {
                        weekDays.map((week, key) => {
                            return (
                                <p key={key} style={showTimeText[key] ? {} : { display: 'none' }}>
                                    <span className={styles.weektimeHelpWeekTx}>{week + "："}</span>
                                    <span>{showTimeText[key]}</span>
                                </p>
                            );
                        })
                    }
                </div >
            </div >
        </div >
    );
}

export default Index;
