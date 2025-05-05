import { useState } from "react";

const TeacherForm = ({ element, changeId, changeObject, changeValueObject, deleteObject }: any) => {
	const [data, setData] = useState(element);
	const handlerChangeValue = (e: any) => {
		const { name, value } = e.target;
		setData((prevData: any) => ({
			...prevData,
			[name]: value,
		}))
	}
	const handlerChange = (e: any) => {
		e.preventDefault();
		changeValueObject(data);
	}
	if (element.id === changeId) {
		return (
			<li key={element.id} className='list_row'>
				<form className='row_form'>
					<div className='row_form_texts'>
						<label>
							<input placeholder='имя *' name='name' value={data.name} onChange={handlerChangeValue} />
						</label>
						<label>
							<input placeholder='фамилия *' name='surname' value={data.surname} onChange={handlerChangeValue} />
						</label>
						<label>
							<input placeholder='отчество' name='patronymic' value={data.patronymic} onChange={handlerChangeValue} />
						</label>
					</div>
					<div className='row_buttons'>
						<button className='row_button_create' onClick={handlerChange} >
							изменить
						</button>
						<button className='row_button_cancel' onClick={() => { changeObject({ id: '' }) }}>
							закрыть
						</button>
					</div>
				</form>
			</li>
		)
	} else {
		return (
			<li key={element.id} className='list_row'>
				<div className='list_row_text'>
					<span className="row_form_text">
						{element.name}
					</span>
					<span className="row_form_text">
						{element.surname}
					</span>
					<span className="row_form_text">
						{element.patronymic}
					</span>
				</div>
				<div className='list_row_buttons'>
					<button onClick={() => { deleteObject(element) }} className='list_button_delete'>
						<img src="/trash.png" alt="Мусорка" />
					</button>
					<button onClick={() => { changeObject(element) }} className='list_button_change'>
						<img src="/change.png" alt="Изменение" />
					</button>
				</div>
			</li>
		)
	}

}

export default TeacherForm;
