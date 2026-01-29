import styled from "styled-components";

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  color: #0284c7;
  border: 2px solid #0284c7;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f9ff;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f9fafb;
    transform: translateX(-4px);
  }
`;

export const DangerButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2);

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
  }
`;
