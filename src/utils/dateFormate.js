export default {
    parsetDate(s) {
        return s < 10 ? '0' + s : s
    },
    //时间获取并设置开始时间、结束时间
    getDates(timeValue) {
        var dat = new Date()
        let days = dat.getDate()
        let year1 = dat.getFullYear()
        let months = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1
        let hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()
        let menth = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
        let second = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()
        let startTime = year1 + '-' + this.parsetDate(months) + '-' + this.parsetDate(days) + ' ' + '00' + ':' + '00' + ':' + '00'
        let endTime = year1 + '-' + this.parsetDate(months) + '-' + this.parsetDate(days) + ' ' + hour + ':' + menth + ':' + second
        let arr = [startTime, endTime]
        timeValue = arr
        return timeValue
    },
    transferDate(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month >= 1 && month <= 9) {
            month = "0" + month
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day
        }
        var dateString = year + '-' + month + '-' + day
        return dateString
    },
    parseWeek(time_BZ) {
        var date = new Date(time_BZ);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    },
    getWeek(timeValue) {
        var date = new Date()
        var today = date.getDay()
        var stepSunDay = -today + 1
        if (today == 0) {
            stepSunDay = -7
        }
        var stepMonday = 7 - today
        var time = date.getTime()
        var monday = new Date(time + stepSunDay * 24 * 3600 * 1000)
        var sunday = new Date(time + stepMonday * 24 * 3600 * 1000)

        let startBZ = new Date(monday.getFullYear(), this.parsetDate(monday.getMonth()), monday.getDate(), 0, 0, 0)
        let startTime = startBZ.getFullYear() + '-' + (startBZ.getMonth() + 1) + '-' + this.parsetDate(startBZ.getDate()) + ' ' + this.parsetDate(startBZ.getHours()) + ':' + this.parsetDate(startBZ.getMinutes()) + ':' + this.parsetDate(startBZ.getSeconds());

        let endBZ = new Date(sunday.getFullYear(), this.parsetDate(sunday.getMonth()), sunday.getDate(), 23, 59, 59)
        let endTime = endBZ.getFullYear() + '-' + (endBZ.getMonth() + 1) + '-' + this.parsetDate(endBZ.getDate()) + ' ' + endBZ.getHours() + ':' + endBZ.getMinutes() + ':' + endBZ.getSeconds()

        timeValue = [startTime, endTime]
        return timeValue

    },
    getMonthDay(timeValue) {
        var dat = new Date()
        let days = dat.getDate()
        let year1 = dat.getFullYear()
        let months = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1
        let hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()
        let menth = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
        let second = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()
        let startTime = year1 + '-' + this.parsetDate(months) + '-' + "01" + ' ' + "00" + ':' + "00" + ':' + "00"
        let endTime = year1 + '-' + this.parsetDate(months) + '-' + this.parsetDate(days) + ' ' + hour + ':' + menth + ':' + second
        return timeValue = [startTime, endTime]
    },
    getYearDay(timeValue) {
        var dat = new Date()
        let days = dat.getDate()
        let year1 = dat.getFullYear() - 1
        let year2 = dat.getFullYear()
        let months = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1
        let hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()
        let menth = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
        let second = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()
        let startTime = year2 + '-' + '01' + '-' + '01' + ' ' + '00' + ':' + '00' + ':' + '00'
        let endTime = year2 + '-' + this.parsetDate(months) + '-' + this.parsetDate(days) + ' ' + hour + ':' + menth +
            ':' + second
        let arr = [startTime, endTime]
        timeValue = arr
        return timeValue

    },
}