import './App.css'
import Prayer from './component/prayer';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {

const cites = [
   // مدن مصر
   { name: "القاهرة", value: "Cairo" },
   { name: "الاسكندرية", value: "Alexandria"},
   { name: "الجيزة", value: "Giza" },
   { name: "المنصورة", value: "Mansoura"},
   { name: "أسوان", value: "Aswan" },
   { name: "الأقصر", value: "Luxor", country: "Egypt" },
 
   // مدن السعودية
   { name: "الرياض", value: "Riyadh" },
   { name: "جدة", value: "Jeddah" },
   { name: "مكة", value: "Mecca" },
   { name: "المدينة", value: "Medina"},
 
   // مدن الإمارات
   { name: "دبي", value: "Dubai" },
   { name: "أبو ظبي", value: "Abu Dhabi" },
 
   // مدن الأردن
   { name: "عمان", value: "Amman"},
 
   // مدن المغرب
   { name: "الرباط", value: "Rabat" },
   { name: "الدار البيضاء", value: "Casablanca" },
 
   // مدن الجزائر
   { name: "الجزائر", value: "Algiers" },
 
   // مدن تونس
   { name: "تونس", value: "Tunis" },
 
   // مدن أخرى
   { name: "باريس", value: "Paris" },
   { name: "لندن", value: "London"},
   { name: "نيويورك", value: "New York" }
]

const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // الأشهر تبدأ من 0
const year = today.getFullYear();

const [prayerTimes, setPrayerTimes] = useState([]);
const [dateTimes, setDateTimes] = useState([]);
const [city,setCity] = useState("cairo")
console.log(city)

useEffect(() => {
  
  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=Eg&country=${city}`);
      const data_Prayer = await response.json();

      setPrayerTimes(data_Prayer.data.timings);
      setDateTimes(data_Prayer.data.date.gregorian.date)
console.log()


    } catch (error) {
      console.error(error);
    }
  };
  

  fetchPrayerTimes();
}, [ city])

const formatTipies =(time) => {
  if (!time){
    return "00:00"
  }
  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;

}
  






  return( 
  <>
<section>
  <div className="countaner">
    <div className="top-sec">
      <div className="city">
        <h3>المدينة</h3>
 
        <select name="city" id="" onChange={(e) => setCity(e.target.value)}> 

          {cites.map((city_obj) => <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>)}  

        </select>
      </div>
      <div className="date">
        <h3>التاريخ</h3>
        <h4>{dateTimes}</h4>
      </div>
    </div>

    <Prayer name="الفجر" time={formatTipies(prayerTimes.Fajr)} />
    <Prayer name="الشروق" time={formatTipies(prayerTimes.Sunrise)} />
    <Prayer name="الظهر" time={formatTipies(prayerTimes.Dhuhr)} />
    <Prayer name="العصر" time={formatTipies(prayerTimes.Asr)} />
    <Prayer name="المغرب" time={formatTipies(prayerTimes.Maghrib)} />
    <Prayer name="العشاء" time={formatTipies(prayerTimes.Isha)} />
  </div>
  </section>  </>
)}

export default App
