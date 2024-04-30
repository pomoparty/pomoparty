#[derive(Default)]
enum Phase {
    #[default]
    Pomo,
    ShortBreak,
    LongBreak,
}

#[derive(Default)]
enum TimerState {
    #[default]
    Init,
    Running,
    Paused,
    Ended,
}

#[derive(Default)]
struct Timer {
    value: f32,
    state: TimerState,
}

#[derive(Default)]
pub struct PomoConfig {
    pomo_length: i32,
    short_break_length: i32,
    long_break_length: i32,
    long_break_interval: i32,
}

#[derive(Default)]
pub struct Pomo {
    timer: Timer,
    phase: Phase,
    pomo_count: i32,
    config: PomoConfig,
}

impl Pomo {
    pub fn new(config: PomoConfig) -> Self {
        Self {
            timer: Timer::default(),
            phase: Phase::default(),
            pomo_count: 0,
            config,
        }
    }
    fn start(&mut self) {}
    fn pause(&mut self) {}
    fn skip(&mut self) {}
}
