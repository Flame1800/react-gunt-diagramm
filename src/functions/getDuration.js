export default (timeStart, timeEnd) => {
    let dHour = timeEnd.hour - timeStart.hour
    let dMinute = timeEnd.minute - timeStart.minute

    if (dMinute < 0) {
        dHour--;
        dMinute = 60 - dMinute * -1
    }

    return `${dHour}ч ${dMinute}мин`;
}