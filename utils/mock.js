import dayjs from 'dayjs'
export function datetime() {
	return dayjs().add(Math.random() * -50, 'day').add(Math.random() * -50, 'minute').add(Math.random() * -50, 'second')
		.add(Math.random() * -50, 'hour').format('YYYY-MM-DD HH:mm:ss')
}
