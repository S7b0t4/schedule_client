import { useEffect, useState } from "react"; import { IData, IGroups, selectLessonI } from "./type";
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
	handleChangeLesson: (val: IData | null) => void;
	selectDate: Date;
}

const ScheduleBlock = ({ selectDate, handleChangeLesson, update, data, selectGroup, selectTime, handleSelectLesson, time, group, period, periodIndex }: Props) => {
	const [lesson, setLesson] = useState<IData | null>(null);

	const formatTime = (date: Date | null) => {
		if (!date) {
			return ``
		}
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`
	}

	useEffect(() => {
		const foundLesson = data.find((val) => {
			const valDate = new Date(val.startDate);
			const isSameTime =
				valDate.getHours() === time[0].getHours() &&
				valDate.getMinutes() === time[0].getMinutes();

			return val.group_id === group.id && isSameTime;
		});

		setLesson(foundLesson || null);
	}, [data, group.id, time]);

	if (lesson) {
		return (
			<td className={group.id === selectGroup && time === period[selectTime] ? 'select_block' : ''} key={group.id} onClick={() => {
				handleChangeLesson(lesson);
			}}>
				<p>{lesson.subject.title}</p>
				<p>{lesson.teacher.surname}. {lesson.teacher.name[0]}. {lesson.teacher.patronymic[0]}</p>
				<p>каб. {lesson.auditorium.number}</p>
				<p>{lesson.regard}</p>
			</td>
		)

	} else {
		return (
			<td className={group.id === selectGroup && time === period[selectTime] ? 'select_block' : ''} key={group.id} onClick={() => {
				const periodIndex = period.findIndex(val => formatTime(val[0]) == formatTime([new Date(time[0]), new Date(time[1])][0]));
				handleSelectLesson({ id: group.id, time: periodIndex })
			}}>
				+
			</td>
		)
	}
}

export default ScheduleBlock
