const send = document.querySelector(".send");
send.addEventListener("click", bmiCalculate);
const result = document.querySelector(".result");
let data = JSON.parse(localStorage.getItem("bmilist")) || [];

function bmiCalculate(e) {
    e.preventDefault();
    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);
    const bmicount = Math.floor(parseInt(weight) / Math.pow(parseInt(height) / 100, 2) * 100) / 100;
    const Today = new Date();
    const todayMonth = today => {
        const thismouth = today.getMonth() + 1;
        if (thismouth < 10) {
            return "0" + thismouth;
        } else {
            return thismouth;
        }
    }
    let bmidata = {
        height: height,
        weight: weight,
        bmicount: bmicount,
        date: todayMonth(Today) + "-" + Today.getDate() + "-" + Today.getFullYear(),
        bmistatus: bmistatus(bmicount),
    }
    if (height > 0 & weight > 0) {
        data.push(bmidata);
        localStorage.setItem("bmilist", JSON.stringify(data));
        listhtml(data.map(bmiList).join(''));
        resultcontent(getresultclsss(bmidata));
        const resetbtn = document.querySelector("i");
        resetbtn.addEventListener("click", resultreset);

    } else {
        alert("請輸入身高體重");
    }

}

//resultocon
const resultcontent = html => result.innerHTML = html;

//reset
const reseticon = `<a class="send">看結果</a>`;

//resultreset

function resultreset() {
    resultcontent(reseticon);
    document.querySelector("#height").value = "";
    document.querySelector("#weight").value = "";
    const send = document.querySelector(".send");
    send.addEventListener("click", bmiCalculate);
}



//算BMI

const bmistatus = bmicount => {
    let arr = [];
    if (bmicount < 18.5) {
        arr = ["過輕", "light"];
        return arr;
    } else if (bmicount >= 18.5 && bmicount < 25) {
        arr = ["理想", "ideal"];
        return arr;
    } else if (bmicount >= 25 && bmicount < 30) {
        arr = ["過重", "heavy"];
        return arr;
    } else if (bmicount >= 30 && bmicount < 35) {
        arr = ["輕度肥胖", "heavylittle"];
        return arr;
    } else if (bmicount >= 35 && bmicount < 40) {
        arr = ["中度肥胖", "heavylittle"];
        return arr;
    } else {
        arr = ["重度肥胖", "heavytoo"];
        return arr;
    }
}

//list模組

const bmiList = ({ bmistatus, height, weight, bmicount, date }) => `
<div class="col-12 list ${bmistatus[1]}">
                <div>${bmistatus[0]}</div>
                <div><span>BMI</span>
                    <p id="bmi">${bmicount}</p>
                </div>
                <div><span>weight</span>
                    <p>${weight}kg</p>
                </div>
                <div><span>height</span>
                    <p>${height}cm</p>
                </div>
                <div><span>${date}</span></div>

            </div>

`;
//list列表
const listhtml = html => {
    const listhtml = document.querySelector(".listhtml");
    listhtml.innerHTML = html;
}

listhtml(data.map(bmiList).join(''));



//get resultclsss

const getresultclsss = ({ bmicount, bmistatus }) => `
<div class="resultclsss ${bmistatus[1]}">
                <a>
                    <bmi>${bmicount}</bmi><br><span>BMI</span><i class="fas fa-sync-alt"></i></a>
                <p>${bmistatus[0]}</p>
            </div>
`;