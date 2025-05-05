import { useState } from "react";

const GroupForm = ({ element, changeId, changeObject, changeValueObject, deleteObject }: any) => {
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
							<input placeholder='название *' name='title' value={data.title} onChange={handlerChangeValue} />
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
						{element.title}
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

export default GroupForm;
