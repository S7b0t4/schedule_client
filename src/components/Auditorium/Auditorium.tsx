import "../style/styles.css"
import axios from 'axios'
import { useEffect, useState } from "react";
import AuditoriumForm from "./AuditoriumForm";

interface objects {
	id: number,
	name: string,
	surname: string,
	patronymic: string,
}

const Auditorium = () => {
	const [list, setList] = useState<objects[]>([]);
	const server_url: string | undefined = process.env.REACT_APP_SERVER;
	const [changeId, setChangeId] = useState<number>();

	const objectList = async () => {
		await axios.get(server_url + '/auditorium/get')
			.then((val) => { setList(val.data) })
			.catch((err) => { console.log(err) })
	}

	const createList = () => (
		<>
			{list.map((element) => (
				<AuditoriumForm
					changeId={changeId}
					element={element}
					changeObject={(e: any) => changeObject(e)}
					changeValueObject={(e: any) => changeValueObject(e)}
					deleteObject={(e: any) => deleteObject(e)}
				></AuditoriumForm>
			))
			}
		</>
	);

	const handlerSubmit = async (e: any) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries());
		if (!formJson.number) {
			console.log('!number')
			return
		}
		try {
			axios.post(server_url + "/auditorium/create", formJson)
				.then((e) => {
					objectList();
					console.log(e);
					form.reset();
				})
				.catch((e) => { console.log(e) });
		} catch (err) {
			console.log(err)
		}
	}

	const changeValueObject = async (data: any) => {
		try {
			axios.put(server_url + "/auditorium/update", data)
				.then((e) => {
					console.log(e);
					setChangeId(0)
					objectList();
				})
				.catch((e) => { console.log(e) });
		} catch (err) {
			console.log(err)
		}
	}

	const deleteObject = async (index: { id: number }) => {
		console.log(index)
		try {
			await axios.delete(server_url + '/auditorium/delete', { params: index });
			objectList();
		}
		catch (err) {
			console.log(err)
		}
	}

	const changeObject = async (dto: { id: number }) => {
		setChangeId(dto.id);
	}


	useEffect(() => {
		objectList()
	}, [])

	return (
		<div className='page'>
			<h1>Кабинеты</h1>
			<div className='page_row'>
				<div className='list_lawout'>
					<ul className='list'>
						{createList()}
					</ul>
				</div>
				<div className='form_lawout'>
					<form className='form' method='post' onSubmit={handlerSubmit}>
						<label>
							<input placeholder="номер кабинета *" name='number' />
						</label>
						<button>
							создать
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Auditorium;
