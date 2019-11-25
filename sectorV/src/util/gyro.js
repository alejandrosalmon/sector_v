export const round = (n) => {
    if (!n) {
      return 0;
    }else if(n > 1){
        return 1;
    }else if(n < -1){
        return -1;
    }
    return Math.floor(n * 100) / 100;
}

export const getAnglesFromGyro = (n) => {
    return 90+((Math.asin(round(-n))/Math.PI)*180);
}