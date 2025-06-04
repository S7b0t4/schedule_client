import "./Schedule.css"
import 'react-datepicker/dist/react-datepicker.css'
import { IData, IGroups, selectGroupI, selectLessonI } from "./type"
import ScheduleBlock from "./ScheduleBlock";

export interface Props {
	groups: IGroups[];
	period: [Date, Date][];
	setOpenTime: (index: number | null) => void;
	formatTime: (date: Date) => string;
	handleSelectLesson: (data: selectLessonI) => void;
	handleSelectGroup: (data: selectGroupI) => void;
	selectTime: number;
	selectGroup: number;
	data: IData[];
	update: boolean;
	handleChangeLesson: (val: IData | null) => void;
	selectDate: Date;
}

const ScheduleTable = ({ selectDate, handleChangeLesson, update, data, selectTime, selectGroup, groups, period, setOpenTime, formatTime, handleSelectLesson, handleSelectGroup }: Props) => {
	return (
		<table className='schedule_table'>
			<thead>
				<tr>
					<th>Время</th>
					{groups.map((group: IGroups, index: number) => (
						<th onClick={() => { handleSelectGroup({ id: group.id }) }} className="col_head" key={index}>{group.title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{period.map((item, index) => (
					<tr key={index}>
						<th onClick={() => { setOpenTime(index) }} className="row_head">
							<div>
								<span>{formatTime(item[0])}</span>
								<span>-</span>
								<span>{formatTime(item[1])}</span>
							</div>
						</th>
						<>
							{
								groups.map((value) => (
									<ScheduleBlock selectDate={selectDate} handleChangeLesson={(val: IData | null) => { handleChangeLesson(val) }} update={update} group={value} period={period} periodIndex={index} time={item} data={data} selectGroup={selectGroup} selectTime={selectTime} handleSelectLesson={(val: any) => handleSelectLesson(val)}></ScheduleBlock>
								))
							}
						</>
					</tr>
				))}
			</tbody>
		</table >
	)
}

export default ScheduleTable;
