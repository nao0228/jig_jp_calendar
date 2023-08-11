// 年月の指定
var year = 2023;
var month = 9;
 
window.onload = function() {
    var data = generate_month_calendar(year, month);//ctable
    document.getElementById('calendar').appendChild(data);//calendarのIDの場所を取得して、dataをそこで表示するやつ
}
 
/**
 * 指定した年月のカレンダー要素を生成して返す
 * @param {number} year  - 年の指定
 * @param {number} month - 月の指定
 */
function generate_month_calendar(year, month) {
    var weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    // カレンダーの情報を取得
    var calendarData = get_month_calendar(year, month);
 
    var i = calendarData[0].weekday; // 初日の曜日を取得 iは初日の曜日の数字が入る
    // カレンダーの初日の曜日が日曜日以外の時、初日より前を空白で埋める
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    var i = calendarData[calendarData.length - 1].weekday; // 末日の曜日を取得
    // カレンダー上の末日より後を埋める
    while(i < 6) {
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }
 
    // カレンダーの要素を生成
    var cTable = document.createElement('table');//html要素を作る
    cTable.className = 'calendar-table';//classnameをカレンダーテーブルにする。
 
    var insertData = '';
    // 曜日部分の生成
    insertData += '<thead>';
    insertData += '<tr>';
    for (var i = 0; i < weekdayData.length; i++) {
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';
 
    // 日付部分の生成
    insertData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++) {
        if(calendarData[i].weekday <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i].day;
        insertData += '</td>';
        if(calendarData[i].weekday >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';
 
    cTable.innerHTML = insertData;//htmlをとりあえずstringでかいて、それをhtmlに変換している。
    return cTable;
}
 
/**
 * 指定した年月のカレンダー情報を返す
 * @param {number} year  - 年の指定
 * @param {number} month - 月の指定
 */
function get_month_calendar(year, month) {
    var firstDate = new Date(year, (month - 1), 1); // 指定した年月の初日の情報
    var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate(); // 指定した年月の末日
    var weekday = firstDate.getDay(); // 指定した年月の初日の曜日
 
    var calendarData = []; // カレンダーの情報を格納
    var weekdayCount = weekday; // 曜日のカウント用
    for (var i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // 曜日のカウントが6(土曜日)まできたら0(日曜日)に戻す
        if(weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }
    return calendarData;
}

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''

    

    if (e.target.id === 'prev') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    var data = generate_month_calendar(year, month);//ctable
    document.getElementById('calendar').appendChild(data);//calendarのIDの場所を取得して、dataをそこで表示するやつ
}

document.querySelector('#prev').addEventListener('click', moveCalendar)//#prev は、id=prevと同じ意味
document.querySelector('#next').addEventListener('click', moveCalendar)