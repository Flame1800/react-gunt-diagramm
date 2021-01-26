export default () => {
    const Data = new Date()
    const hour = Data.getHours()
    const minute = Data.getMinutes()
    
    return {hour, minute}
}