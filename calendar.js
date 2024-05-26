import { program } from "commander";

program.option("-m", "月(1~12)を指定する");
program.parse(process.argv);
const now = new Date();
const month = program.args[0] ?? now.getMonth() + 1;

if (month < 1 || month > 13) {
  console.log("与える引数は1~12です。");
  process.exit(1);
}

const dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土"];
const month_english = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
const startDate = new Date(2024, month -1);
const endDate = new Date(2024, month, 0);
const dateTotal = endDate.getDate() - startDate.getDate() + 1; 
const start_youbi_index = startDate.getDay();

let date_count=1;
let calendar = [];

// 指定月の日付をすべて含む1次元配列として用意したカレンダを作成
for (let i = 0; i <= 5; i++){
  for (let j = 0; j <= 6; j++){
    if (dateTotal > date_count) {
      if (j < start_youbi_index && i == 0) {
        calendar.push("");
      } else {
        let date = new Date(`2024-${month}-${date_count}`);
        calendar.push(date);
        date_count++;
      }
    } else {
      calendar.push("");
    }
  }
}

// 描画
console.log(`        ${month_english[startDate.getMonth()]} ${now.getFullYear()}     `);

dayOfWeek.forEach(date => {
  if (date == "土") {
    console.log(date.padStart(2, ' '));
  } else {
    process.stdout.write(date.padStart(2, ' '));
  }
})

calendar.forEach(day => {
  if (day == '') {
    process.stdout.write(day.padStart(3, ' '));
  } else if (day.getDay() == 6){
    console.log(day.getDate().toString().padStart(3, ' '));
  } else {
    process.stdout.write(day.getDate().toString().padStart(3, ' '));
  }
});

console.log();