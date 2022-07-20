export function calcElapsedTime(date: string) { 
    const dateJS:any = new Date(date);
    const now: number = Date.now();
    const timeLapsed: number = (now - dateJS);
  
    const timeInSeconds:number = (timeLapsed / 1000);
    const timeInMinutes:number = timeInSeconds / 60;
    const timeInHours:number = timeInMinutes / 60;
    const timeInDays:number = timeInHours / 24;
    const timeInMonths:number = timeInDays / 30;
    const timeInYears:number = timeInMonths / 12;
  
  if(timeInSeconds < 60) {
    return `${Math.ceil(timeInSeconds)}secs`;
  } else if(timeInSeconds > 60 && timeInMinutes < 60 ){
    return `${Math.ceil(timeInMinutes)}mins`;
  } else if(timeInMinutes > 60 && timeInHours < 60){
    return `${Math.ceil(timeInHours)}hrs`;
  }else if (timeInHours > 60 && timeInDays < 30){
    return `${Math.ceil(timeInDays)}days`;
  }else if(timeInDays > 30 && timeInMonths < 12){
    return `${Math.ceil(timeInMonths)}mths`;
  }else if(timeInMonths > 12){
    return `${Math.ceil(timeInYears)}yrs`;
  }
  }
  