
const headDate = (phone) => {
  let nowDate = new Date();
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = nowDate.getDate();
  if(day <= 15){
    if(month == "01"){
      year-=1;
      month=12;
    }else{
      month-=1;
    }
  }
  return {
    year,
    month,
    day,
  }
}
export default {
  headDate,
}

