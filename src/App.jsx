import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './PageComponents/Header';
import TitleHeader from './PageComponents/TitleHeader';
import GanderAndAge from './PageComponents/GenderAndAge';
import Time from './PageComponents/Time';
import ChartMain from './Page2Components/ChartMain'
import initialData from './data/data';
import ChartTitle from './Page2Components/ChartTitle';
import RecommendG from './Page4Components/ResultComponent'
import ResultComponent from './Page4Components/RecommendG'
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import { colors } from '@mui/material';

const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const updateDataInLocalStorage = (key, updateCallback) => {
    const data = getDataFromLocalStorage(key);
    if (Array.isArray(data)) {
        const updatedData = updateCallback(data);
        saveDataToLocalStorage(key, updatedData);
    } else {
        console.error(`Expected an array, but received:`, data);
        if (!data) {
            console.warn('Data not found. Initializing default data.');
            saveDataToLocalStorage(key, initialData);
        }
    }
};

const initialDataKey = "ageGroupData";
if (!Array.isArray(getDataFromLocalStorage(initialDataKey))) {
    const initialData = [
        {
            age: "10대",
            times:[
                { time:10, male: 23, female: 16},
                { time:11, male: 21, female: 14 },
                { time:12, male: 26, female: 17 },
                { time:13, male: 27, female: 20 },
                { time:14, male: 34, female: 21 },
                { time:15, male: 39, female: 24 },
                { time:16, male: 45, female: 30 },
                { time:17, male: 56, female: 35 },
                { time:18, male: 49, female: 33 },
                { time:19, male: 50, female: 25 },
                { time:20, male: 40, female: 20 },
            ]
        },
        {
            age: "20대",
            times:[
                { time:10, male: 88, female: 60},
                { time:11, male: 106, female: 73 },
                { time:12, male: 119, female: 78 },
                { time:13, male: 139, female: 85 },
                { time:14, male: 159, female: 97 },
                { time:15, male: 181, female: 110 },
                { time:16, male: 198, female: 119 },
                { time:17, male: 245, female: 144 },
                { time:18, male: 254, female: 146 },
                { time:19, male: 220, female: 127 },
                { time:20, male: 181, female: 92 },
            ]
        },
        {
            age: "30대",
            times:[
                { time:10, male: 65, female: 61},
                { time:11, male: 64, female: 71 },
                { time:12, male: 60, female: 80 },
                { time:13, male: 76, female: 87 },
                { time:14, male: 86, female: 100 },
                { time:15, male: 98, female: 115 },
                { time:16, male: 112, female: 136 },
                { time:17, male: 154, female: 163 },
                { time:18, male: 167, female: 163 },
                { time:19, male: 147, female: 145 },
                { time:20, male: 125, female: 106 },
            ]
        },
        {
            age: "40대",
            times:[
                { time:10, male: 55, female: 72},
                { time:11, male: 50, female: 87 },
                { time:12, male: 54, female: 93 },
                { time:13, male: 59, female: 100 },
                { time:14, male: 69, female: 113 },
                { time:15, male: 73, female: 127 },
                { time:16, male: 86, female: 157 },
                { time:17, male: 112, female: 183 },
                { time:18, male: 125, female: 150 },
                { time:19, male: 108, female: 131 },
                { time:20, male: 84, female: 105 },
            ]
        },
        {
            age: "50대",
            times:[
                { time:10, male: 34, female: 36},
                { time:11, male: 39, female: 40 },
                { time:12, male: 46, female: 32 },
                { time:13, male: 50, female: 40 },
                { time:14, male: 58, female: 48 },
                { time:15, male: 63, female: 53 },
                { time:16, male: 66, female: 62 },
                { time:17, male: 83, female: 73 },
                { time:18, male: 88, female: 67 },
                { time:19, male: 78, female: 58 },
                { time:20, male: 57, female: 47 },
            ]
        },
        {
            age: "60대",
            times:[
                { time:10, male: 5, female: 11},
                { time:11, male: 7, female: 7 },
                { time:12, male: 7, female: 8 },
                { time:13, male: 6, female: 9 },
                { time:14, male: 11, female: 15 },
                { time:15, male: 7, female: 16 },
                { time:16, male: 8, female: 12 },
                { time:17, male: 5, female: 8 },
                { time:18, male: 3, female: 2 },
                { time:19, male: 0, female: 2 },
                { time:20, male: 0, female: 1 },
            ]
        },
        {
            age: "70+",
            times:[
                { time:10, male: 0, female: 0},
                { time:11, male: 0, female: 0 },
                { time:12, male: 0, female: 0 },
                { time:13, male: 0, female: 0 },
                { time:14, male: 0, female: 0 },
                { time:15, male: 0, female: 0 },
                { time:16, male: 0, female: 0 },
                { time:17, male: 0, female: 0 },
                { time:18, male: 0, female: 0 },
                { time:19, male: 0, female: 0 },
                { time:20, male: 0, female: 0 },
            ]
        }
    ];
    saveDataToLocalStorage(initialDataKey, initialData);
}

const incrementGenderCount = (ageGroup, time, gender) => {
    updateDataInLocalStorage(initialDataKey, (data) => {
        const ageIndex = data.findIndex(group => group.age === ageGroup);
        if (ageIndex !== -1) {
            const timeIndex = data[ageIndex].times.findIndex(t => t.time === time);
            if (timeIndex !== -1) {
                if (gender === "male") {
                    data[ageIndex].times[timeIndex].male += 1;
                } else if (gender === "female") {
                    data[ageIndex].times[timeIndex].female += 1;
                }
            }
        }
        console.log(data);
        return data;
    });
};

function App() {
    const [gender, setGender] = useState(null);
    const [age, setAge] = useState(null);
    const [time, setTime] = useState(null);
    const [selectedTab, setSelectedTab] = useState('송출 범위 설정'); // 탭 상태
    const [chartData, setChartData] = useState([]); // ChartMain에 전달할 데이터 상태
    const [resultAi, setResultAi] = useState();
    const [isSaving, setIsSaving] = useState(false); // 저장 중 상태 추가
    const [promptResponses, setPromptResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const genAI = useMemo(() => new GoogleGenerativeAI("AIzaSyACjnwgAYn1gSvGUPx-qwqRo3JWjIb4X-c"), []);

    const getResponseForGivenPrompt = async (prompt) => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);

            const response = result.response;
            const text = response.text();
            setResultAi(text);
            console.log(`AI Response: ${text}`);

            setPromptResponses((prevResponses) => [...prevResponses, text]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (gender && age && time != null) {
            setIsSaving(true); // 저장 중 상태 활성화
            setTimeout(() => {
                const confirmSave = window.confirm(
                    `변경 사항을 저장하시겠습니까?\n성별: ${gender === "female" ? '여성' : '남성'}, 연령: ${age}, 시간: ${time}:00`, 
                );
                if (confirmSave) {
                    console.log(`성별: ${gender}, 연령: ${age}, 시간: ${time}`);
                    incrementGenderCount(age, time, gender);
                    const updatedData = getDataFromLocalStorage(initialDataKey);
                    const ageGroupData = updatedData.find(group => group.age === age);
                    if (ageGroupData) {
                        setChartData(ageGroupData.times); // 선택된 나이의 times 배열을 상태로 설정
                    }

                    const prompt = `${gender === "female" ? '여성' : '남성'} ${age} 사람이 선호하는 광고가 뭐야? 한 문장으로 알려줘.`;
                    getResponseForGivenPrompt(prompt);
                }
                setIsSaving(false); // 저장 중 상태 해제
            }, 200); // 0.2초 뒤에 실행
        }
    }, [gender, age, time]);

    const handleTabChange = (tab) => {
        if (isSaving) {
            alert("저장 중입니다. 저장이 완료된 후 탭을 변경해주세요.");
            return;
        }

        if (!gender || !age || time === null) {
            alert("성별, 연령, 시간 모두 선택해야 탭을 이동할 수 있습니다.");
            return;
        }

        setSelectedTab(tab);
    };

    // 선택한 탭에 따른 렌더링 분기
    const renderContent = () => {
        switch (selectedTab) {
            case '데이터 통계':
                return (
                    <>
                        <ChartTitle gender={gender} age={age} />
                        <ChartMain gender={gender} times={chartData} />
                    </>
                );
            case '송출 범위 설정':
                return (
                    <>
                        <GanderAndAge setGender={setGender} selectedGender={gender} setAge={setAge} selectedAge={age} />
                        <Time setTime={setTime} selectedTime={time} />
                    </>
                );
            case '데이터기반 결과':
                return (
                    <>
                        <ResultComponent gender={gender === "female" ? '여성' : '남성'} age={age} time={time} />
                        <RecommendG recommendText={resultAi} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <Header />
            <TitleHeader selectedTab={selectedTab} setSelectedTab={handleTabChange} /> {/* handleTabChange 사용 */}
            {renderContent()}
        </div>
    );
}

export default App;
