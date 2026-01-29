import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useApplicationState } from "../../hooks/use-application-state";
import { defaultState } from "../../state";
import { PageHeader, PageSubtitle, PageTitle } from "../../ui/Page";
import { DangerButton } from "../../ui/Button";

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  height: 100vh;
  overflow-y: auto;
`;

const SettingsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SettingsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
`;

const SettingDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const ToggleSwitch = styled.button`
  width: 48px;
  height: 28px;
  background: ${(props) => (props.$active ? "#0284c7" : "#d1d5db")};
  border: none;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 4px;
    left: ${(props) => (props.$active ? "24px" : "4px")};
    transition: all 0.2s;
  }

  &:hover {
    background: ${(props) => (props.$active ? "#0369a1" : "#9ca3af")};
  }
`;

const Input = styled.input`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  width: 240px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  width: 240px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const JSONTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: "Monaco", "Menlo", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #1f2937;
  background: #f9fafb;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
    background: white;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 13px;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #16a34a;
  font-size: 13px;
  font-weight: 500;
`;

const ConfigActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export default function SettingsPage() {
  const [state, setState] = useApplicationState();

  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mealReminders, setMealReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [userName, setUserName] = useState("Pandu Prasetya");
  const [userEmail, setUserEmail] = useState("pandu@example.com");
  const [calorieGoal, setCalorieGoal] = useState("2000");
  const [proteinGoal, setProteinGoal] = useState("150");
  const [dietType, setDietType] = useState("balanced");
  const [measurementUnit, setMeasurementUnit] = useState("metric");

  const [jsonConfig, setJsonConfig] = useState(() =>
    JSON.stringify(state, null, 2),
  );

  const [jsonError, setJsonError] = useState("");

  const handleSaveSettings = () => {
    console.log("[v0] Saving settings:", {
      userName,
      userEmail,
      calorieGoal,
      proteinGoal,
      dietType,
      measurementUnit,
      notifications,
      emailDigest,
      darkMode,
      mealReminders,
      weeklyReports,
    });
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    setUserName("Pandu Prasetya");
    setUserEmail("pandu@example.com");
    setCalorieGoal("2000");
    setProteinGoal("150");
    setDietType("balanced");
    setMeasurementUnit("metric");
    setNotifications(true);
    setEmailDigest(true);
    setDarkMode(false);
    setMealReminders(true);
    setWeeklyReports(false);
  };

  const handleValidateJSON = () => {
    try {
      JSON.parse(jsonConfig);
      setJsonError("");
      return true;
    } catch (error) {
      setJsonError(`Invalid JSON: ${error.message}`);
      return false;
    }
  };

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(jsonConfig);
      setJsonConfig(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (error) {
      setJsonError(`Cannot format invalid JSON: ${error.message}`);
    }
  };

  const handleResetJSON = () => {
    setJsonConfig(JSON.stringify(defaultState, null, 2));
    setJsonError("");
  };

  const handleApplyConfig = () => {
    if (handleValidateJSON()) {
      console.log("[v0] Applying JSON configuration:", JSON.parse(jsonConfig));
      alert("Configuration applied successfully!");
      setState(() => JSON.parse(jsonConfig));
    }
  };

  return (
    <MainContent>
      <SettingsContainer>
        <PageHeader>
          <PageTitle>Settings</PageTitle>
          <PageSubtitle>
            Manage your account and application preferences
          </PageSubtitle>
        </PageHeader>

        <SettingsSection>
          <SectionTitle>Profile Information</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Full Name</SettingLabel>
              <SettingDescription>
                Your display name across the app
              </SettingDescription>
            </SettingInfo>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Email Address</SettingLabel>
              <SettingDescription>
                Used for notifications and account recovery
              </SettingDescription>
            </SettingInfo>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Nutritional Goals</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Daily Calorie Goal</SettingLabel>
              <SettingDescription>Target calories per day</SettingDescription>
            </SettingInfo>
            <Input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              placeholder="2000"
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Daily Protein Goal</SettingLabel>
              <SettingDescription>
                Target protein in grams per day
              </SettingDescription>
            </SettingInfo>
            <Input
              type="number"
              value={proteinGoal}
              onChange={(e) => setProteinGoal(e.target.value)}
              placeholder="150"
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Diet Type</SettingLabel>
              <SettingDescription>
                Your preferred dietary approach
              </SettingDescription>
            </SettingInfo>
            <Select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
            >
              <option value="balanced">Balanced</option>
              <option value="low-carb">Low Carb</option>
              <option value="high-protein">High Protein</option>
              <option value="keto">Ketogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </Select>
          </SettingRow>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Preferences</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Measurement Units</SettingLabel>
              <SettingDescription>
                Choose your preferred unit system
              </SettingDescription>
            </SettingInfo>
            <Select
              value={measurementUnit}
              onChange={(e) => setMeasurementUnit(e.target.value)}
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lb, in)</option>
            </Select>
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Dark Mode</SettingLabel>
              <SettingDescription>
                Use dark theme across the app
              </SettingDescription>
            </SettingInfo>
            <ToggleSwitch
              $active={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Notifications</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDescription>
                Receive app notifications on your device
              </SettingDescription>
            </SettingInfo>
            <ToggleSwitch
              $active={notifications}
              onClick={() => setNotifications(!notifications)}
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Meal Reminders</SettingLabel>
              <SettingDescription>
                Get reminded when it's time for meals
              </SettingDescription>
            </SettingInfo>
            <ToggleSwitch
              $active={mealReminders}
              onClick={() => setMealReminders(!mealReminders)}
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Email Digest</SettingLabel>
              <SettingDescription>
                Daily summary of your nutrition
              </SettingDescription>
            </SettingInfo>
            <ToggleSwitch
              $active={emailDigest}
              onClick={() => setEmailDigest(!emailDigest)}
            />
          </SettingRow>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Weekly Reports</SettingLabel>
              <SettingDescription>
                Get weekly progress reports via email
              </SettingDescription>
            </SettingInfo>
            <ToggleSwitch
              $active={weeklyReports}
              onClick={() => setWeeklyReports(!weeklyReports)}
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>JSON Configuration</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Advanced Configuration</SettingLabel>
              <SettingDescription>
                Edit application settings in JSON format for advanced
                customization
              </SettingDescription>
            </SettingInfo>
          </SettingRow>
          <JSONTextarea
            value={jsonConfig}
            onChange={(e) => {
              setJsonConfig(e.target.value);
              setJsonError("");
            }}
            spellCheck={false}
          />
          {jsonError && <ErrorMessage>{jsonError}</ErrorMessage>}
          <ConfigActions>
            <PrimaryButton onClick={handleApplyConfig}>
              Apply Configuration
            </PrimaryButton>
            <SecondaryButton onClick={handleFormatJSON}>
              Format JSON
            </SecondaryButton>
            <SecondaryButton onClick={handleValidateJSON}>
              Validate JSON
            </SecondaryButton>
            <SecondaryButton onClick={handleResetJSON}>
              Reset to Default
            </SecondaryButton>
          </ConfigActions>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Danger Zone</SectionTitle>
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Delete Account</SettingLabel>
              <SettingDescription>
                Permanently delete your account and all data
              </SettingDescription>
            </SettingInfo>
            <DangerButton
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete your account? This action cannot be undone.",
                  )
                ) {
                  console.log("[v0] Account deletion requested");
                  alert("Account deletion process initiated");
                }
              }}
            >
              Delete Account
            </DangerButton>
          </SettingRow>
        </SettingsSection>

        <ButtonGroup>
          <PrimaryButton onClick={handleSaveSettings}>
            Save Changes
          </PrimaryButton>
          <SecondaryButton onClick={handleResetSettings}>
            Reset to Default
          </SecondaryButton>
        </ButtonGroup>
      </SettingsContainer>
    </MainContent>
  );
}
