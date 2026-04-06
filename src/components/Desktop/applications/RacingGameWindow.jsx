import { GameCanvas } from '../../carGame/modules/racing-game/index';

export default function RacingGameWindow() {
  return (
    <div className="h-full w-full bg-[#0b1020]">
      <GameCanvas width={960} height={540} className="h-full w-full" />
    </div>
  );
}

