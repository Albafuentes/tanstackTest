// TimerCountdown.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TimerCountdown from './TimerCountdown';
import { createFormatsMock } from '@/test/mocks/formats.mocks';
import { createMotionReactMock } from '@/test/mocks/motion.mocks';

vi.mock('@/utils/formats.utils', () => ({
  formatDate: vi.fn(),
  formatSentenceString: vi.fn(),
  secondsToTime: vi.fn(),
  timeToSeconds: vi.fn(),
}));

const { setSecondsToTime, setTimeToSeconds } = createFormatsMock();
const { setAnimateComplete, resetAnimate } = createMotionReactMock();

describe('TimerCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    vi.restoreAllMocks();
    resetAnimate();
  });

  it("shows the formatted time based on the 'time' prop when it is provided", () => {
    setTimeToSeconds(30);

    render(<TimerCountdown time="00:30" showTimer />);

    expect(screen.getByText('00:30')).toBeInTheDocument();
  });

  it("uses the default time value when 'time' is not provided", () => {
    const value = '00:30';
    setSecondsToTime(value);

    render(<TimerCountdown showTimer />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('shows 00:00 when showTimer is false', () => {
    setTimeToSeconds(30);
    render(<TimerCountdown time="00:30" showTimer={false} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('The countdown counts down when time passes and showTimer is active', () => {
    setTimeToSeconds(10);
    setAnimateComplete();

    render(<TimerCountdown time="00:10" showTimer />);

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('calls onFinish when the countdown reaches zero', () => {
    setTimeToSeconds(5);
    setAnimateComplete();

    const onFinish = vi.fn();
    render(<TimerCountdown time="00:05" onFinish={onFinish} showTimer />);

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('does not start the countdown when isPaused is true', () => {
    setTimeToSeconds(10);

    render(<TimerCountdown time="00:10" isPaused showTimer />);

    expect(screen.getByText('00:10')).toBeInTheDocument();
  });

  it('does not start the countdown when showTimer is false, regardless of the remaining time', () => {
    setTimeToSeconds(5);

    const onFinish = vi.fn();
    render(
      <TimerCountdown time="00:05" onFinish={onFinish} showTimer={false} />,
    );

    expect(onFinish).not.toHaveBeenCalled();
  });

  it('stops the animation on unmount without triggering a late onFinish when the component is unmounted before the countdown completes', () => {
    setTimeToSeconds(5);
    const onFinish = vi.fn();

    const { unmount } = render(
      <TimerCountdown time="00:05" onFinish={onFinish} showTimer />,
    );

    unmount();
    vi.advanceTimersByTime(5000); // si el cleanup no hubiese parado el timer, esto dispararía onComplete

    expect(onFinish).not.toHaveBeenCalled();
  });

  it("automatically restarts when it is completed ('run' recursion)", () => {
    setTimeToSeconds(5);
    setAnimateComplete();
    setAnimateComplete();

    const onFinish = vi.fn();
    render(<TimerCountdown time="00:05" onFinish={onFinish} showTimer />);

    expect(onFinish).toHaveBeenCalledTimes(2);
  });
});
