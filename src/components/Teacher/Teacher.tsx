import "../style/styles.css"
import axios from 'axios'
import { useEffect, useState } from "react";
import TeacherForm from "./TeachrForm";

interface objects {
	id: number,
	name: string,
	surname: string,
	patronymic: string,
}

const Teacher = () => {
	const [list, setList] = useState<objects[]>([]);
	const server_url: string | undefined = process.env.REACT_APP_SERVER;
	const [changeId, setChangeId] = useState<number>();

	const objectList = async () => {
		await axios.get(server_url + '/teacher/get')
			.then((val) => { setList(val.data) })
			.catch((err) => { console.log(err) })
	}

	const createList = () => (
		<>
			{list.map((element) => (
				<TeacherForm
					changeId={changeId}
					element={element}
					changeObject={(e: any) => changeObject(e)}
					changeValueObject={(e: any) => changeValueObject(e)}
					deleteObject={(e: any) => deleteObject(e)}
				></TeacherForm>
			))
			}
		</>
	);

	const handlerSubmit = async (e: any) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries());
		if (!formJson.name || !formJson.surname) {
			console.log('!name or !surname')
			return
		}
		try {
			axios.post(server_url + "/teacher/create", formJson)
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
			axios.put(server_url + "/teacher/update", data)
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
		console.log({ params: index })
		try {
			await axios.delete(server_url + '/teacher/delete', { params: index });
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
			<h1>Преподователь</h1>
			<div className='page_row'>
				<div className='list_lawout'>
					<ul className='list'>
						{createList()}
					</ul>
				</div>
				<div className='form_lawout'>
					<form className='form' method='post' onSubmit={handlerSubmit}>
						<label>
							<input placeholder="имя *" name='name' />
						</label>
						<label>
							<input placeholder="фамилия *" name='surname' />
						</label>
						<label>
							<input placeholder="отчество" name='patronymic' />
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

export default Teacher;
