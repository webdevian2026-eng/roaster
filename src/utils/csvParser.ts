import * as XLSX from 'xlsx';
import { format, parse } from 'date-fns';

export interface ParsedRosterData {
  agents: Array<{
    gender: string;
    employee_id: string;
    name: string;
    designation: string;
    team: string;
  }>;
  entries: Array<{
    employee_id: string;
    date: string;
    day_name: string;
    shift_code: string | null;
    leave_type: string | null;
  }>;
  month: number;
  year: number;
}

export async function parseRosterFile(file: File): Promise<ParsedRosterData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length < 3) {
          throw new Error('Invalid file format: Not enough rows');
        }

        // Parse headers
        const dateRow = jsonData[0]; // Row with week numbers (49, 50, 51)
        const dayRow = jsonData[1]; // Row with day names (Mon, Tue, Wed...)
        
        // Find where date columns start (after "Designation" column)
        let dateStartIndex = -1;
        for (let i = 0; i < jsonData[2].length; i++) {
          if (jsonData[2][i] === 'Designation') {
            dateStartIndex = i + 1;
            break;
          }
        }

        if (dateStartIndex === -1) {
          throw new Error('Could not find Designation column');
        }

        // Extract month and year from first date
        const firstDateCol = dateStartIndex;
        const firstDayNum = parseInt(dayRow[firstDateCol]);
        const weekNum = parseInt(dateRow[firstDateCol]);
        
        // Assume current year if not specified
        const year = new Date().getFullYear();
        const month = Math.ceil(weekNum / 4.33); // Approximate month from week number

        const agents: ParsedRosterData['agents'] = [];
        const entries: ParsedRosterData['entries'] = [];

        // Parse agent rows (skip first 2 header rows and team header rows)
        let currentTeam = '';
        
        for (let rowIndex = 2; rowIndex < jsonData.length; rowIndex++) {
          const row = jsonData[rowIndex];
          
          // Check if this is a team header row (merged cell with team name)
          if (row[1] && !row[2] && typeof row[1] === 'string' && row[1].trim().length > 0) {
            currentTeam = row[1].trim();
            continue;
          }

          // Skip empty rows
          if (!row[2] || !row[3]) continue;

          const gender = row[0] || 'M';
          const employee_id = row[1]?.toString() || `EMP${rowIndex}`;
          const name = row[2];
          const designation = row[3];

          // Add agent
          agents.push({
            gender,
            employee_id,
            name,
            designation,
            team: currentTeam
          });

          // Parse daily entries
          for (let colIndex = dateStartIndex; colIndex < row.length; colIndex++) {
            const cellValue = row[colIndex];
            if (!cellValue) continue;

            const dayNum = parseInt(dayRow[colIndex]);
            if (isNaN(dayNum)) continue;

            const date = new Date(year, month - 1, dayNum);
            const dateStr = format(date, 'yyyy-MM-dd');
            const dayName = format(date, 'EEE');

            const cellStr = cellValue.toString().trim().toUpperCase();

            // Determine if it's a shift or leave
            const leaveTypes = ['OFF', 'CL', 'SL', 'GH', 'ADO', 'A', 'LWP'];
            const isLeave = leaveTypes.includes(cellStr);

            entries.push({
              employee_id,
              date: dateStr,
              day_name: dayName,
              shift_code: isLeave ? null : cellStr,
              leave_type: isLeave ? cellStr : null
            });
          }
        }

        resolve({
          agents,
          entries,
          month,
          year
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
}
