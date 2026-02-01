import React, { useState } from "react";
import styled from "styled-components";

const WeekPanel = styled.div`
  background: linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%);
  // border-radius: 24px;
  // padding: 32px;
  height: 100vh;
  overflow-y: scroll;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const PanelHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PanelHeader = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  padding: 32px;
  margin: 0;
`;

const WeekDay = styled.div`
  background: white;
  // border-radius: 16px;
  padding: 20px;
  // margin-bottom: 16px;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DayTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const MealSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MealIcon = styled.div`
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const MealInfo = styled.div`
  flex: 1;
`;

const MealTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
`;

const MealName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
`;

const MealMacros = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const EmptySlot = styled.div`
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  margin-top: 12px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0284c7;
    color: #0284c7;
    background: #f0f9ff;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const WeekPlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const DayDate = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

const Timeline = styled.div`
  position: relative;
  min-height: 400px;
`;

const TimelineAxis = styled.div`
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #e5e7eb 0%, #e5e7eb 100%);
`;

const TimeMarker = styled.div`
  height: 90px;
  border-top: 1px solid #efefef;

  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
  padding-top: 10px;
`;

const timeMarkers = [
  "6 AM",
  "8 AM",
  "10 AM",
  "12 PM",
  "2 PM",
  "4 PM",
  "6 PM",
  "8 PM",
  "10 PM",
];

// Convert time string (e.g., "8:00 AM") to position percentage on timeline (6 AM - 10 PM)
const getTimelinePosition = (timeStr) => {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes;
  const startTime = 6 * 60; // 6 AM
  const endTime = 22 * 60; // 10 PM
  const range = endTime - startTime;

  return ((totalMinutes - startTime) / range) * 130;
};

const TimelineItem = styled.div`
  position: absolute;
  left: 40px;
  top: ${(props) => props.$position}%;
  transform: translateY(-50%);
  width: calc(100% - 20px);
  z-index: 1;
`;

export const SchedulePage = () => {
  const recipes = [
    {
      id: 1,
      name: "Oatmeal Breakfast Bowl",
      description: "Healthy oats with berries and honey",
      calories: 320,
      protein: 12,
      carbs: 55,
      fat: 8,
      time: 10,
      icon: "🥣",
    },
    {
      id: 2,
      name: "Greek Salad",
      description: "Fresh vegetables with feta cheese",
      calories: 280,
      protein: 15,
      carbs: 18,
      fat: 18,
      time: 15,
      icon: "🥗",
    },
    {
      id: 3,
      name: "Grilled Chicken Breast",
      description: "Lean protein with herbs",
      calories: 380,
      protein: 45,
      carbs: 5,
      fat: 18,
      time: 25,
      icon: "🍗",
    },
    {
      id: 4,
      name: "Salmon with Vegetables",
      description: "Omega-3 rich fish with greens",
      calories: 420,
      protein: 38,
      carbs: 12,
      fat: 25,
      time: 30,
      icon: "🐟",
    },
    {
      id: 5,
      name: "Quinoa Power Bowl",
      description: "Complete protein with veggies",
      calories: 360,
      protein: 18,
      carbs: 48,
      fat: 12,
      time: 20,
      icon: "🍲",
    },
    {
      id: 6,
      name: "Smoothie Bowl",
      description: "Fruits and protein powder",
      calories: 290,
      protein: 22,
      carbs: 38,
      fat: 6,
      time: 8,
      icon: "🥤",
    },
    {
      id: 7,
      name: "Turkey Sandwich",
      description: "Whole grain with lean turkey",
      calories: 340,
      protein: 28,
      carbs: 35,
      fat: 10,
      time: 10,
      icon: "🥪",
    },
    {
      id: 8,
      name: "Vegetable Stir Fry",
      description: "Colorful veggies with tofu",
      calories: 310,
      protein: 16,
      carbs: 42,
      fat: 10,
      time: 20,
      icon: "🥘",
    },
  ];
  const [weekPlan, setWeekPlan] = useState([
    {
      day: "Monday",
      date: "Jan 27",
      meals: [
        { id: 1, recipeId: 1, time: "8:00 AM", mealType: "Breakfast" },
        { id: 2, recipeId: 3, time: "1:00 PM", mealType: "Lunch" },
        { id: 3, recipeId: 4, time: "7:00 PM", mealType: "Dinner" },
      ],
    },
    {
      day: "Tuesday",
      date: "Jan 28",
      meals: [
        { id: 4, recipeId: 6, time: "8:30 AM", mealType: "Breakfast" },
        { id: 5, recipeId: 7, time: "12:30 PM", mealType: "Lunch" },
      ],
    },
    {
      day: "Wednesday",
      date: "Jan 29",
      meals: [],
    },
    {
      day: "Thursday",
      date: "Jan 30",
      meals: [{ id: 6, recipeId: 1, time: "8:00 AM", mealType: "Breakfast" }],
    },
    {
      day: "Friday",
      date: "Jan 31",
      meals: [],
    },
    {
      day: "Saturday",
      date: "Feb 1",
      meals: [
        { id: 7, recipeId: 5, time: "10:00 AM", mealType: "Brunch" },
        { id: 8, recipeId: 8, time: "6:00 PM", mealType: "Dinner" },
      ],
    },
    {
      day: "Sunday",
      date: "Feb 2",
      meals: [],
    },
  ]);

  const getRecipeById = (id) => {
    return recipes.find((r) => r.id === id);
  };

  return (
    <WeekPanel>
      <PanelHeader>Schedule</PanelHeader>
      <WeekPlanList>
        {weekPlan.map((day, index) => (
          <WeekDay key={index}>
            <DayHeader>
              <DayTitle>{day.day}</DayTitle>
              <DayDate>{day.date}</DayDate>
            </DayHeader>

            <Timeline>
              {/* Time markers */}
              {timeMarkers.map((marker, idx) => (
                <TimeMarker $position={(idx / (timeMarkers.length - 1)) * 100}>
                  {marker}
                </TimeMarker>
              ))}

              {/* Meals on timeline */}
              {day.meals.length > 0 ? (
                day.meals.map((meal) => {
                  const recipe = getRecipeById(meal.recipeId);
                  if (!recipe) return null;
                  const position = getTimelinePosition(meal.time);
                  return (
                    <TimelineItem key={meal.id} $position={position}>
                      <MealSlot>
                        {/* <MealIcon>{recipe.icon}</MealIcon> */}
                        <MealInfo>
                          <MealTime>
                            {meal.time} • {meal.mealType}
                          </MealTime>
                          <MealName>{recipe.name}</MealName>
                          <MealMacros>
                            {recipe.calories} kcal • {recipe.protein}g P •{" "}
                            {recipe.carbs}g C • {recipe.fat}g F
                          </MealMacros>
                        </MealInfo>
                      </MealSlot>
                    </TimelineItem>
                  );
                })
              ) : (
                <TimelineItem $position={20}>
                  <EmptySlot>+ Add meals to your day</EmptySlot>
                </TimelineItem>
              )}
            </Timeline>
          </WeekDay>
        ))}
      </WeekPlanList>
    </WeekPanel>
  );
};
