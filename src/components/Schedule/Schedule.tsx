import "./Schedule.css"
import axios from 'axios'
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import ScheduleTable from "./ScheduleTable";
import { IAuditorium, IData, IGroups, ISubject, ITeacher, selectGroupI, selectLessonI, selectSubjectI } from "./type";
import { ru } from 'date-fns/locale/ru';
registerLocale('ru', ru)

const Schedule = () => {
	const [selectDate, setSelectDate] = useState<Date>(new Date());
	const [time, setTime] = useState([["09:00", "10:20"], ["10:30", "11:50"], ["12:30", "13:50"], ["14:00", "15:20"], ["15:30", "16:50"]]);
	const [smallDay, setSmallDay] = useState<boolean>(false);
	const [period, setPeriod] = useState<[Date, Date][]>([]);
	const [data, setData] = useState<IData[]>([]);
	const [groups, setGroups] = useState<IGroups[]>([]);
	const [subjects, setSubjects] = useState<ISubject[]>([]);
	const [teachers, setTeachers] = useState<ITeacher[]>([]);
	const [auditorium, setAuditorium] = useState<IAuditorium[]>([]);
	const [openTime, setOpenTime] = useState<number | null>(null)
	const [selectGroup, setSelectGroup] = useState<number>(0);
	const [selectTime, setSelectTime] = useState<number>(-1);
	const [selectSubject, setSelectSubject] = useState<number>(0);
	const [selectTeacher, setSelectTeacher] = useState<number>(0);
	const [selectAuditorium, setSelectAuditorium] = useState<number>(0);
	const [selectLesson, setSelectLesson] = useState<IData | null>(null);
	const [update, setUpdate] = useState<boolean>(false);
	const [exist, setExist] = useState<boolean>(false);
	const [selectId, setSelectId] = useState<number>(0);
	const server_url: string | undefined = process.env.REACT_APP_SERVER;
	registerLocale('ru', ru)

	const ChangeTime = (time: Date, timeString: string) => {
		const [hours, minutes] = timeString.split(':').map(Number);
		const newDate = new Date(time);
		newDate.setHours(hours, minutes, 0, 0);
		return newDate;
	}

	const convertTime = () => {
		const result: [Date, Date][] = time.map(v => {
			const start = new Date();
			const end = new Date();
			return ([ChangeTime(start, v[0]), ChangeTime(end, v[1])]);
		})

		setPeriod(result);
	}

	const formatTime = (date: Date | null) => {
		if (!date) {
			return ``
		}
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`
	}

	const getData = async (date: Date) => {
		const start = new Date(date);
		start.setHours(0);
		start.setMinutes(0);
		const end = new Date(date);
		end.setHours(23);
		end.setMinutes(59);
		const dateForData = {
			start,
			end
		}
		await axios.post(server_url + '/schedule/group_by_time', dateForData)
			.then((val) => { setData(val.data); console.log(val.data) })
			.catch((err) => { console.log(err) })
	}

	const getGroups = async () => {
		await axios.get(server_url + '/group/get')
			.then((val) => { setGroups(val.data) })
			.catch((err) => { console.log(err) })
	}
	const getSubject = async () => {
		await axios.get(server_url + '/subject/get')
			.then((val) => { setSubjects(val.data) })
			.catch((err) => { console.log(err) })
	}
	const getTeachers = async () => {
		await axios.get(server_url + '/teacher/get')
			.then((val) => { setTeachers(val.data) })
			.catch((err) => { console.log(err) })
	}
	const getAuditorium = async () => {
		await axios.get(server_url + '/auditorium/get')
			.then((val) => { setAuditorium(val.data) })
			.catch((err) => { console.log(err) })
	}
	const handleSaveAsExcel = async () => {
		await axios.post(server_url + '/schedule/save_by_date', selectDate)
			.then((val) => { console.log(val.data) })
			.catch((err) => { console.log(err) })
	}

	const handleChangeLesson = (val: IData | null) => {
		if (val) {
			setSelectId(val.id);
			setExist(true);
			setSelectGroup(val?.group_id || 0);
			const periodIndex = period.findIndex(time => formatTime(time[0]) == formatTime([new Date(val?.startDate), new Date(val?.endDate)][0]))
			setSelectTime(periodIndex);
			setSelectSubject(val.subject_id);
			setSelectTeacher(val.teacher_id);
			setSelectAuditorium(val.auditorium_id);
		} else {
			setExist(false)
		}
	}

	useEffect(() => {
		getData(selectDate);
		setUpdate(!update)
		convertTime();
	}, [selectDate])

	useEffect(() => {
		getGroups();
		getSubject();
		getTeachers();
		getAuditorium();
		convertTime();
	}, [])

	useEffect(() => {
		convertTime();
	}, [time])

	const handleChangeGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectGroup(Number(event.target.value))
	}

	const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectSubject(Number(event.target.value))
	}

	const handleChangeTeacher = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectTeacher(Number(event.target.value))
	}

	const handleChangeAuditorium = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectAuditorium(Number(event.target.value))
	}

	const handleChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectTime(Number(event.target.value))
	}

	const handleSelectLesson = (val: selectLessonI) => {
		setSelectTeacher(0);
		setSelectAuditorium(0);
		setSelectSubject(0);
		setSelectGroup(val.id)
		setSelectTime(val.time)
		setExist(false)
	}

	const handleSelectGroup = (val: selectGroupI) => {
		setSelectGroup(val.id)
	}

	const clearForm = () => {
		setSelectGroup(0);
		setSelectTime(-1);
		setSelectTeacher(0);
		setSelectAuditorium(0);
		setSelectSubject(0);
	}

	const handlerSubmit = (e: any) => {
		e.preventDefault();
		if (
			selectGroup !== 0 &&
			selectTeacher !== 0 &&
			selectTime !== -1 &&
			selectSubject !== 0 &&
			selectAuditorium !== 0
		) {
			const form = e.target;
			const formData = new FormData(form);

			const formJson = Object.fromEntries(formData.entries());

			const start = ChangeTime(selectDate, time[selectTime][0]);
			const end = ChangeTime(selectDate, time[selectTime][1]);
			const lesson = {
				group_id: selectGroup,
				startDate: start,
				endDate: end,
				subject_id: selectSubject,
				teacher_id: selectTeacher,
				auditorium_id: selectAuditorium,
				regard: formJson.regard
			}
			try {
				axios.post(server_url + "/schedule/create", lesson)
					.then((e) => {
						form.reset();
						setUpdate(!update)
						getData(selectDate);
						clearForm();
					})
					.catch((e) => { console.log(e) });
			} catch (err) {
				console.log(err)
			}
		}
	}

	const handlerDelete = (e: any) => {
		e.preventDefault();
		try {
			axios.delete(server_url + "/schedule/delete", { params: { id: selectId } })
				.then((e) => {
					setUpdate(!update)
					getData(selectDate);
					clearForm();
					setExist(false)
				})
				.catch((e) => { console.log(e) });
		} catch (err) {
			console.log(err)
		}
	}

	const handlerDayType = () => {
		setSmallDay(!smallDay)
		if (smallDay) {
			setTime([["09:00", "10:10"], ["10:20", "11:30"], ["11:40", "12:50"], ["13:00", "14:10"], ["14:20", "15:40"]])
		} else {
			setTime([["09:00", "10:20"], ["10:30", "11:50"], ["12:30", "13:50"], ["14:00", "15:20"], ["15:30", "16:50"]])
		}
		convertTime()
	}

	return (
		<div className='schedule_page'>
			<h1>Раcписания</h1>
			<div className='schedule_type_row'>
				<button onClick={handlerDayType}>{smallDay ? 'Короткие' : 'Будни'}</button>
			</div>
			<div className='schedule_page_row'>
				<div className='main-part'>
					<ScheduleTable selectDate={selectDate} handleChangeLesson={(val: IData | null) => { handleChangeLesson(val) }} update={update} data={data} selectGroup={selectGroup} selectTime={selectTime} handleSelectGroup={(val) => handleSelectGroup(val)} handleSelectLesson={(val) => handleSelectLesson(val)} formatTime={(val) => formatTime(val)} setOpenTime={(index) => setOpenTime(index)} period={period} groups={groups}></ScheduleTable>
					<div className='save_row'>
						<DatePicker
							selected={selectDate}
							onChange={(date) => { setSelectDate(date || new Date()) }}
							locale="ru"
							dateFormat="dd-MM-yyyy"
						/>
						<button onClick={handleSaveAsExcel}>Сохранить как Excel</button>
					</div>
				</div>
				<div className='extra-part'>
					<form className="lesson" method="post" onSubmit={handlerSubmit}>
						<label>Группа</label>
						<select value={selectGroup} onChange={handleChangeGroup}>
							<option key={0} value={0} disabled selected hidden>Выбрать</option>
							{
								groups.map((val) => (
									<option value={val.id}>{val.title}</option>
								))
							}
						</select>
						<label>Время</label>
						<select value={selectTime} onChange={handleChangeTime}>
							<option key={-1} value={-1} disabled selected hidden>Выбрать</option>
							{
								period.map((val, index) => (
									<option key={index} value={index}>{`${formatTime(val[0])} - ${formatTime(val[1])}`}</option>
								))
							}
						</select>
						<label>Предмет</label>
						<select value={selectSubject} onChange={handleChangeSubject}>
							<option key={0} value={0} disabled selected hidden>Выбрать</option>
							{
								subjects.map((val) => (
									<option key={val.id} value={val.id}>{val.title}</option>
								))
							}
						</select>
						<label>Преподователь</label>
						<select value={selectTeacher} onChange={handleChangeTeacher}>
							<option key={0} value={0} disabled selected hidden>Выбрать</option>
							{
								teachers.map((val) => (
									<option key={val.id} value={val.id}>{val.surname} {val.name[0]}. {val.patronymic[0]}.</option>
								))
							}
						</select>
						<label>Кабинет</label>
						<select value={selectAuditorium} onChange={handleChangeAuditorium}>
							<option key={0} value={0} disabled selected hidden>Выбрать</option>
							{
								auditorium.map((val, index) => (
									<option key={val.id} value={val.id}>{val.number}</option>
								))
							}
						</select>
						<label>
							<input placeholder="уведомление" name='regard' />
						</label>
						<div className="button_row">
							<button type="submit" className={exist ? 'exist' : ''}>{exist ? 'Измениь' : 'Сохранить'}</button>
							{exist && <button onClick={handlerDelete} className="delete">Удалить</button>}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Schedule;
