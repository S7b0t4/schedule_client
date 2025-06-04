export interface IGroups {
	id: number,
	title: string,
}
export interface ISubject {
	id: number,
	title: string,
}

export interface ITeacher {
	id: number,
	name: string,
	surname: string,
	patronymic: string,
}

export interface IAuditorium {
	id: number,
	number: number,
}

export interface selectLessonI {
	id: number,
	time: number,
}

export interface selectGroupI {
	id: number,
}

export interface selectSubjectI {
	title: string,
	id: number,
}

export interface IData {
	id: number,
	auditorium_id: number,
	group_id: number,
	subject_id: number,
	teacher_id: number,
	regard: string,
	startDate: Date,
	endDate: Date,
	subject: SubjectI,
	teacher: TeacherI,
	auditorium: AuditoriumI
}

export interface SubjectI {
	title: string,
	id: number
}

export interface TeacherI {
	name: string,
	surname: string,
	patronymic: string,
	id: number
}

export interface AuditoriumI {
	number: number,
	id: number
}

export interface objects {
	id: number,
	name: string,
	surname: string,
	patronymic: string,
}
