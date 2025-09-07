#!/usr/bin/env node
import { execSync } from 'child_process';

const isCI = process.env.CI === 'true';
const cmd = isCI ? 'jest --bail' : 'jest --watch --bail';

console.log(`Running tests in ${isCI ? 'CI' : 'local'} mode...`);
execSync(cmd, { stdio: 'inherit' });
