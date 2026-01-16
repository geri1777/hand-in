import { LockModes } from "./types.js";

const fs = require("fs");

export class Config {
  lockMode: LockModes;
  lockDuration: number;
  confirmSubmission: boolean;

  constructor(configPath: string) {
    if (!fs.existsSync(configPath)) {
      const defaultConfig = {
        lockMode: LockModes.IP,
        lockDuration: 300,
        confirmSubmission: false,
      };

      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    this.lockMode = config.lockMode as LockModes;
    this.lockDuration = config.lockDuration;
    this.confirmSubmission = config.confirmSubmission ?? false;

    let updated = false;
    if (!config.lockMode) {
      this.lockMode = LockModes.IP;
      updated = true;
    }

    if (!config.lockDuration) {
      this.lockDuration = 300;
      updated = true;
    }

    if (config.confirmSubmission === undefined) {
      this.confirmSubmission = false;
      updated = true;
    }

    if (updated) {
      const updatedConfig = {
        lockMode: this.lockMode,
        lockDuration: this.lockDuration,
        confirmSubmission: this.confirmSubmission,
      };
      fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), "utf-8");
    }
  }
}
