export default {
    //uid:{Uid0:xxx,Uid1:xxx,....}
    toHex: (uid) => {
        let Hex = ""
        for (let i in uid) {
            let tmp = uid[i].toString(16).toUpperCase()
            if (tmp.length === 1) tmp = "0" + tmp
            if(i==="Uid3") Hex+=tmp
            else Hex +=tmp+":"
        }
        return Hex
    },
    toDec:(Hex)=>{
        let HexArray=Hex.split(':')
        const uid={}
        for (let i=0;i<4;i++){
            uid['Uid'+i]=parseInt(HexArray[i],16)
        }  
        return uid
    }
}