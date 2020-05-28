import React, { useState } from 'react';
import ReactWeektimePicker from '../../components/react-weektime-picker';
import styles from './index.module.scss';

const Index = props => {
    const [week_times, set_week_times] = useState('');
    const change_week_times = value => set_week_times(value);

    return (<div className={styles.appBox}>
        <ReactWeektimePicker
            change_value={
                change_week_times
            }
            value={
                week_times
            }
        />
        <p style={{ maxWidth: '658px', wordBreak: 'break-all' }}>{week_times}</p>
    </div>);
}

export default Index;
