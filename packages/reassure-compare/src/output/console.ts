import type { AddedEntry, CompareResult, CompareEntry, RemovedEntry, PerformanceMetadata } from '../types';
import {
  formatCount,
  formatDuration,
  formatMetadata,
  formatRenderCountChange,
  formatRenderDurationChange,
} from '../utils/format';

export function printToConsole(data: CompareResult) {
  // No need to log errors or warnings as these were be logged on the fly

  console.log('❇️  Performance comparison results:');
  printMetadata('Current', data.metadata.current);
  printMetadata('Baseline', data.metadata.baseline);

  console.log('\n➡️  Signficant changes to render duration');
  data.significant.forEach(printRegularLine);

  console.log('\n➡️  Meaningless changes to render duration');
  data.meaningless.forEach(printRegularLine);

  console.log('\n➡️  Render count changes');
  data.countChanged.forEach(printRegularLine);

  console.log('\n➡️  Added scenarios');
  data.added.forEach(printAddedLine);

  console.log('\n➡️  Removed scenarios');
  data.removed.forEach(printRemovedLine);

  console.log('');
}

function printMetadata(name: string, metadata?: PerformanceMetadata) {
  console.log(` - ${name}: ${formatMetadata(metadata)}`);
}

function printRegularLine(entry: CompareEntry) {
  console.log(` - ${entry.name}: ${formatRenderDurationChange(entry)} | ${formatRenderCountChange(entry)}`);
}

function printAddedLine(entry: AddedEntry) {
  const { current } = entry;
  console.log(` - ${entry.name}: ${formatDuration(current.meanDuration)} | ${formatCount(current.meanCount)}`);
}

function printRemovedLine(entry: RemovedEntry) {
  const { baseline } = entry;
  console.log(` - ${entry.name}: ${formatDuration(baseline.meanDuration)} | ${formatCount(baseline.meanCount)}`);
}
