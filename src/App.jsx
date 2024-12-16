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
        { age: "10대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "20대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "30대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "40대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "50대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "60대", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
        { age: "70+", times: Array.from({ length: 11 }, (_, i) => ({ time: 10 + i, male: 0, female: 0 })) },
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
