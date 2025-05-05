import { useEffect, useState } from "react";
import { IData, IGroups, selectLessonI } from "./type";

export interface Props {
	handleSelectLesson: (data: selectLessonI) => void,
	selectTime: number;
	selectGroup: number;
	data: IData[];
	time: [Date, Date];
	period: [Date, Date][];
	periodIndex: number;
	group: IGroups;
	update: boolean;
}

const ScheduleBlock = ({ update, data, selectGroup, selectTime, handleSelectLesson, time, group, period, periodIndex }: Props) => {
	const [lesson, setLesson] = useState<IData | null>(null);

	useEffect(() => {
		data.forEach((val) => {
			if (val.group_id === group.id && new Date(val.startDate).toISOString() === new Date(time[0]).toISOString()) {
				setLesson(val)
			}
		})
	}, [data, group, selectTime, selectGroup, selectTime, update]);

	if (lesson) {
		return (
			<td className={group.id === selectGroup && time === period[selectTime] ? 'select_block' : ''} key={group.id} onClick={() => { handleSelectLesson({ id: group.id, time: periodIndex }) }}>
				{lesson.subject_id}
			</td>
		)

	} else {
		return (
			<td className={group.id === selectGroup && time === period[selectTime] ? 'select_block' : ''} key={group.id} onClick={() => { handleSelectLesson({ id: group.id, time: periodIndex }) }}>
				+
			</td>
		)
	}
}

export default ScheduleBlock
