export interface PorscheSale {
  saleId: number;
  saleDate: string; // "YYYY-MM-DD" or "INVALID"
  model: string;
  modelYear: number;
  price: number;
  mileage: number;
  payMethod: string;
  city: string;
  state: string;
  deliveryStatus: string;
  family: string;
}

export const rawPorscheSales: Omit<PorscheSale, 'family'>[] = [
  { saleId: 6, saleDate: 'INVALID', model: '718 Cayman', modelYear: 2022, price: 79500.00, mileage: 9800, payMethod: 'Credit Card', city: 'Boston', state: 'MA', deliveryStatus: 'Delivered' },
  { saleId: 7, saleDate: '2024-03-14', model: '911 Turbo S', modelYear: 2024, price: 235000.00, mileage: 1200, payMethod: 'Wire Transfer', city: 'Seattle', state: 'WA', deliveryStatus: 'Delivered' },
  { saleId: 8, saleDate: '2024-04-18', model: 'Cayenne Coupe', modelYear: 2023, price: 112750.00, mileage: 6400, payMethod: 'Financing', city: 'Austin', state: 'TX', deliveryStatus: 'In Transit' },
  { saleId: 9, saleDate: 'INVALID', model: 'Macan S', modelYear: 2021, price: 68900.00, mileage: 28, payMethod: 'Cash', city: 'Denver', state: 'CO', deliveryStatus: 'Pending' },
  { saleId: 10, saleDate: '2024-05-22', model: 'Taycan 4S', modelYear: 2024, price: 121000.00, mileage: 0, payMethod: 'Bank Transfer', city: 'Los Angeles', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 11, saleDate: '2024-08-06', model: 'Panamera 4', modelYear: 2023, price: 104500.00, mileage: 14500, payMethod: 'Credit Card', city: 'Miami', state: 'FL', deliveryStatus: 'Cancelled' },
  { saleId: 12, saleDate: '2024-07-11', model: '911 Carrera S', modelYear: 2020, price: 96300.00, mileage: 41000, payMethod: 'Lease', city: 'New York', state: 'NY', deliveryStatus: 'Delivered' },
  { saleId: 13, saleDate: 'INVALID', model: 'Cayenne E-Hybrid', modelYear: 2022, price: 89750.00, mileage: 11744, payMethod: 'Wire Transfer', city: 'San Diego', state: 'CA', deliveryStatus: 'Pending Approval' },
  { saleId: 14, saleDate: '2024-08-19', model: '718 Boxster', modelYear: 2021, price: 73500.00, mileage: 22300, payMethod: 'Debit Card', city: 'Chicago', state: 'IL', deliveryStatus: 'Shipped' },
  { saleId: 15, saleDate: '2024-09-02', model: 'Macan GTS', modelYear: 2024, price: 95000.00, mileage: 3500, payMethod: 'Financing', city: 'Phoenix', state: 'AZ', deliveryStatus: 'In Transit' },
  { saleId: 16, saleDate: '2024-09-17', model: 'Taycan Turbo', modelYear: 2023, price: 153200.50, mileage: 11, payMethod: 'ACH Payment', city: 'Dallas', state: 'TX', deliveryStatus: 'Delivered' },
  { saleId: 17, saleDate: 'INVALID', model: '911 GT3', modelYear: 2024, price: 241000.00, mileage: 750, payMethod: 'Wire Transfer', city: 'Las Vegas', state: 'NV', deliveryStatus: 'Pending' },
  { saleId: 18, saleDate: '2024-05-11', model: 'Panamera Turbo S', modelYear: 2022, price: 132000.00, mileage: 19250, payMethod: 'Cash', city: 'San Jose', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 19, saleDate: '2024-12-12', model: 'Cayenne Turbo GT', modelYear: 2024, price: 188000.00, mileage: 2100, payMethod: 'Crypto Payment', city: 'Houston', state: 'TX', deliveryStatus: 'Awaiting Delivery' },
  { saleId: 20, saleDate: '2024-12-25', model: '911 Carrera Cabriolet', modelYear: 2023, price: 127800.00, mileage: 12000, payMethod: 'Credit Card', city: 'Atlanta', state: 'GA', deliveryStatus: 'Delivered' },
  { saleId: 21, saleDate: '2025-01-06', model: 'Macan', modelYear: 2021, price: 58900.00, mileage: 33700, payMethod: 'Bank Transfer', city: 'Orlando', state: 'FL', deliveryStatus: 'Pending' },
  { saleId: 22, saleDate: 'INVALID', model: '718 Spyder RS', modelYear: 2024, price: 164000.00, mileage: 900, payMethod: 'Financing', city: 'Portland', state: 'OR', deliveryStatus: 'In Transit' },
  { saleId: 23, saleDate: '2025-02-14', model: 'Taycan Cross Turismo', modelYear: 2023, price: 118500.00, mileage: 7800, payMethod: 'Wire Transfer', city: 'Charlotte', state: 'NC', deliveryStatus: 'Delivered' },
  { saleId: 24, saleDate: 'INVALID', model: 'Cayenne S', modelYear: 2022, price: 91300.00, mileage: 16000, payMethod: 'Credit Card', city: 'Nashville', state: 'TN', deliveryStatus: 'Pending' },
  { saleId: 25, saleDate: '2025-03-21', model: '911 Targa 4S', modelYear: 2024, price: 158750.00, mileage: 2500, payMethod: 'Lease', city: 'Minneapolis', state: 'MN', deliveryStatus: 'Delivered' },
  { saleId: 26, saleDate: '2025-03-28', model: 'Panamera', modelYear: 2020, price: 72000.00, mileage: 49000, payMethod: 'Bank Transfer', city: 'Philadelphia', state: 'PA', deliveryStatus: 'Cancelled' },
  { saleId: 27, saleDate: '2025-04-09', model: 'Macan Electric', modelYear: 2025, price: 86500.00, mileage: 0, payMethod: 'Wire Transfer', city: 'San Antonio', state: 'TX', deliveryStatus: 'Delivered' },
  { saleId: 28, saleDate: 'INVALID', model: '911 Dakar', modelYear: 2024, price: 270000.00, mileage: 1050, payMethod: 'Cash', city: 'Salt Lake City', state: 'UT', deliveryStatus: 'Awaiting Pickup' },
  { saleId: 29, saleDate: '2025-05-12', model: 'Taycan GTS', modelYear: 2023, price: 139000.00, mileage: 6250, payMethod: 'Financing', city: 'Raleigh', state: 'NC', deliveryStatus: 'In Transit' },
  { saleId: 30, saleDate: '2025-06-18', model: 'Cayenne', modelYear: 2021, price: 76800.00, mileage: 38400, payMethod: 'Credit Card', city: 'Detroit', state: 'MI', deliveryStatus: 'Delivered' },
  { saleId: 31, saleDate: 'INVALID', model: '718 Cayman GT4 RS', modelYear: 2024, price: 173600.00, mileage: 400, payMethod: 'Wire Transfer', city: 'Columbus', state: 'OH', deliveryStatus: 'Pending' },
  { saleId: 32, saleDate: '2025-07-07', model: '911 Carrera GTS', modelYear: 2022, price: 119900.00, mileage: 13600, payMethod: 'Cash', city: 'Indianapolis', state: 'IN', deliveryStatus: 'Delivered' },
  { saleId: 33, saleDate: '2025-07-22', model: 'Panamera 4 E-Hybrid', modelYear: 2023, price: 109250.00, mileage: 8900, payMethod: 'Lease', city: 'Fort Worth', state: 'TX', deliveryStatus: 'In Transit' },
  { saleId: 34, saleDate: '2025-08-14', model: 'Macan T', modelYear: 2022, price: 82000.00, mileage: 21750, payMethod: 'Wire Transfer', city: 'Jacksonville', state: 'FL', deliveryStatus: 'Delivered' },
  { saleId: 35, saleDate: '2025-09-01', model: 'Taycan Turbo S', modelYear: 2025, price: 214000.00, mileage: 0, payMethod: 'Crypto Payment', city: 'San Diego', state: 'CA', deliveryStatus: 'Pending Review' },
  { saleId: 36, saleDate: 'INVALID', model: '911 Carrera', modelYear: 2024, price: 124500.00, mileage: 4800, payMethod: 'Credit Card', city: 'Tampa', state: 'FL', deliveryStatus: 'Delivered' },
  { saleId: 37, saleDate: '2025-09-18', model: 'Cayenne S', modelYear: 2023, price: 98200.00, mileage: 12200, payMethod: 'Bank Transfer', city: 'Sacramento', state: 'CA', deliveryStatus: 'Pending' },
  { saleId: 38, saleDate: '2025-10-04', model: 'Macan', modelYear: 2022, price: 67500.00, mileage: 24100, payMethod: 'Financing', city: 'Cleveland', state: 'OH', deliveryStatus: 'Delivered' },
  { saleId: 39, saleDate: '2025-10-12', model: 'Taycan', modelYear: 2025, price: 116900.00, mileage: 0, payMethod: 'Wire Transfer', city: 'Milwaukee', state: 'WI', deliveryStatus: 'In Transit' },
  { saleId: 40, saleDate: '2025-10-29', model: 'Panamera 4S', modelYear: 2024, price: 112000.00, mileage: 10, payMethod: 'Cash', city: 'Kansas City', state: 'MO', deliveryStatus: 'Delivered' },
  { saleId: 41, saleDate: '2025-02-11', model: '718 Boxster', modelYear: 2021, price: 74000.00, mileage: 31000, payMethod: 'Debit Card', city: 'Omaha', state: 'NE', deliveryStatus: 'Cancelled' },
  { saleId: 42, saleDate: '2025-11-16', model: '911 Turbo', modelYear: 2024, price: 198300.00, mileage: 2400, payMethod: 'Wire Transfer', city: 'Albuquerque', state: 'NM', deliveryStatus: 'Awaiting Delivery' },
  { saleId: 43, saleDate: 'INVALID', model: 'Cayenne Coupe', modelYear: 2023, price: 103750.00, mileage: 6773, payMethod: 'Wire Transfer', city: 'Tucson', state: 'AZ', deliveryStatus: 'Pending Approval' },
  { saleId: 44, saleDate: 'INVALID', model: 'Macan GTS', modelYear: 2024, price: 93600.00, mileage: 5800, payMethod: 'Financing', city: 'Fresno', state: 'CA', deliveryStatus: 'Shipped' },
  { saleId: 45, saleDate: '2025-12-07', model: 'Taycan 4S', modelYear: 2025, price: 129000.00, mileage: 0, payMethod: 'ACH Payment', city: 'Virginia Beach', state: 'VA', deliveryStatus: 'In Transit' },
  { saleId: 46, saleDate: '2025-12-22', model: 'Panamera Turbo', modelYear: 2022, price: 136000.00, mileage: 18400, payMethod: 'Credit Card', city: 'Colorado Springs', state: 'CO', deliveryStatus: 'Delivered' },
  { saleId: 47, saleDate: 'INVALID', model: '911 GT3 RS', modelYear: 2024, price: 286500.00, mileage: 700, payMethod: 'Wire Transfer', city: 'Arlington', state: 'TX', deliveryStatus: 'Pending' },
  { saleId: 48, saleDate: '2026-01-08', model: 'Cayenne E-Hybrid', modelYear: 2023, price: 92800.00, mileage: 15000, payMethod: 'Lease', city: 'Bakersfield', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 49, saleDate: '2026-01-15', model: 'Macan T', modelYear: 2022, price: 72400.00, mileage: 19750, payMethod: 'Cash', city: 'Mesa', state: 'AZ', deliveryStatus: 'Awaiting Pickup' },
  { saleId: 50, saleDate: '2026-01-28', model: 'Taycan Turbo', modelYear: 2025, price: 158500.00, mileage: 3200, payMethod: 'Crypto Payment', city: 'Atlanta', state: 'GA', deliveryStatus: 'Delivered' },
  { saleId: 51, saleDate: '2026-02-03', model: '718 Cayman', modelYear: 2021, price: 69900.00, mileage: 27600, payMethod: 'Bank Transfer', city: 'Long Beach', state: 'CA', deliveryStatus: 'Pending' },
  { saleId: 52, saleDate: 'INVALID', model: '911 Targa 4', modelYear: 2024, price: 141250.00, mileage: 2100, payMethod: 'Financing', city: 'Oakland', state: 'CA', deliveryStatus: 'In Transit' },
  { saleId: 53, saleDate: '2026-02-19', model: 'Panamera', modelYear: 2020, price: 71500.00, mileage: 52000, payMethod: 'Wire Transfer', city: 'Tulsa', state: 'OK', deliveryStatus: 'Delivered' },
  { saleId: 54, saleDate: '2026-02-25', model: 'Cayenne Turbo', modelYear: 2023, price: 146800.00, mileage: 11300, payMethod: 'Credit Card', city: 'Wichita', state: 'KS', deliveryStatus: 'Pending' },
  { saleId: 55, saleDate: '2026-03-01', model: 'Macan Electric', modelYear: 2025, price: 89700.00, mileage: 0, payMethod: 'Lease', city: 'New Orleans', state: 'LA', deliveryStatus: 'Delivered' },
  { saleId: 56, saleDate: '2026-03-14', model: '911 Carrera S', modelYear: 2022, price: 104600.00, mileage: 15900, payMethod: 'Bank Transfer', city: 'Honolulu', state: 'HI', deliveryStatus: 'Cancelled' },
  { saleId: 57, saleDate: 'INVALID', model: 'Taycan GTS', modelYear: 2024, price: 142000.00, mileage: 6600, payMethod: 'Wire Transfer', city: 'Anaheim', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 58, saleDate: '2026-04-08', model: 'Cayenne', modelYear: 2021, price: 78400.00, mileage: 40250, payMethod: 'Cash', city: 'Henderson', state: 'NV', deliveryStatus: 'Awaiting Review' },
  { saleId: 59, saleDate: 'INVALID', model: '718 Spyder RS', modelYear: 2025, price: 169000.00, mileage: 850, payMethod: 'Financing', city: 'Lexington', state: 'KY', deliveryStatus: 'In Transit' },
  { saleId: 60, saleDate: '2026-04-21', model: '911 Dakar', modelYear: 2024, price: 268900.00, mileage: 1400, payMethod: 'Credit Card', city: 'Riverside', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 61, saleDate: '2026-04-29', model: 'Panamera 4', modelYear: 2023, price: 101300.00, mileage: 12700, payMethod: 'Wire Transfer', city: 'Corpus Christi', state: 'TX', deliveryStatus: 'Pending' },
  { saleId: 62, saleDate: '2026-05-05', model: 'Macan S', modelYear: 2021, price: 66750.00, mileage: 29800, payMethod: 'Cash', city: 'St. Louis', state: 'MO', deliveryStatus: 'Delivered' },
  { saleId: 63, saleDate: '2026-05-14', model: 'Taycan Cross Turismo', modelYear: 2024, price: 127900.00, mileage: 7500, payMethod: 'Lease', city: 'Pittsburgh', state: 'PA', deliveryStatus: 'In Transit' },
  { saleId: 64, saleDate: '2026-05-23', model: 'Cayenne Turbo GT', modelYear: 2025, price: 200000.00, mileage: 1950, payMethod: 'Wire Transfer', city: 'Cincinnati', state: 'OH', deliveryStatus: 'Delivered' },
  { saleId: 65, saleDate: '2026-06-02', model: '911 Carrera Cabriolet', modelYear: 2023, price: 132000.00, mileage: 8800, payMethod: 'Crypto Payment', city: 'Anchorage', state: 'AK', deliveryStatus: 'Pending Review' },
  { saleId: 66, saleDate: '2026-06-15', model: '718 Cayman GT4 RS', modelYear: 2024, price: 176400.00, mileage: 600, payMethod: 'Credit Card', city: 'Plano', state: 'TX', deliveryStatus: 'Delivered' },
  { saleId: 67, saleDate: 'INVALID', model: 'Panamera 4 E-Hybrid', modelYear: 2022, price: 108500.00, mileage: 16200, payMethod: 'Bank Transfer', city: 'Newark', state: 'NJ', deliveryStatus: 'Cancelled' },
  { saleId: 68, saleDate: '2026-07-07', model: 'Macan', modelYear: 2021, price: 59000.00, mileage: 36000, payMethod: 'Financing', city: 'Greensboro', state: 'NC', deliveryStatus: 'Awaiting Delivery' },
  { saleId: 69, saleDate: '2026-07-20', model: 'Taycan Turbo S', modelYear: 2025, price: 218000.00, mileage: 0, payMethod: 'Wire Transfer', city: 'Lincoln', state: 'NE', deliveryStatus: 'Pending' },
  { saleId: 70, saleDate: 'INVALID', model: 'Cayenne S', modelYear: 2024, price: 99950.00, mileage: 5300, payMethod: 'Debit Card', city: 'Jersey City', state: 'NJ', deliveryStatus: 'Delivered' },
  { saleId: 71, saleDate: '2026-04-08', model: '911 Carrera GTS', modelYear: 2024, price: 121750.00, mileage: 5872, payMethod: 'Credit Card', city: 'Chandler', state: 'AZ', deliveryStatus: 'Delivered' },
  { saleId: 72, saleDate: '2026-08-18', model: '718 Boxster GTS', modelYear: 2023, price: 91500.00, mileage: 13300, payMethod: 'Lease', city: 'Reno', state: 'NV', deliveryStatus: 'Shipped' },
  { saleId: 73, saleDate: '2026-08-31', model: 'Panamera Turbo S', modelYear: 2022, price: 134000.00, mileage: 20100, payMethod: 'Wire Transfer', city: 'Buffalo', state: 'NY', deliveryStatus: 'In Transit' },
  { saleId: 74, saleDate: '2026-09-09', model: 'Macan GTS', modelYear: 2024, price: 96800.00, mileage: 0, payMethod: 'ACH Payment', city: 'Durham', state: 'NC', deliveryStatus: 'Delivered' },
  { saleId: 75, saleDate: '2026-09-17', model: 'Taycan 4S', modelYear: 2025, price: 131600.00, mileage: 2900, payMethod: 'Wire Transfer', city: 'Laredo', state: 'TX', deliveryStatus: 'Pending Approval' },
  { saleId: 76, saleDate: '2026-09-28', model: 'Cayenne E-Hybrid', modelYear: 2023, price: 94300.00, mileage: 13100, payMethod: 'Cash', city: 'Madison', state: 'WI', deliveryStatus: 'Delivered' },
  { saleId: 77, saleDate: '2026-10-06', model: '911 Turbo S', modelYear: 2025, price: 242000.00, mileage: 1100, payMethod: 'Crypto Payment', city: 'Lubbock', state: 'TX', deliveryStatus: 'Awaiting Pickup' },
  { saleId: 78, saleDate: '2026-10-16', model: '718 Cayman S', modelYear: 2022, price: 82750.00, mileage: 22500, payMethod: 'Credit Card', city: 'Toledo', state: 'OH', deliveryStatus: 'Cancelled' },
  { saleId: 79, saleDate: '2026-10-29', model: 'Macan Electric', modelYear: 2026, price: 91300.00, mileage: 0, payMethod: 'Wire Transfer', city: 'Irvine', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 80, saleDate: '2026-11-03', model: 'Panamera', modelYear: 2021, price: 79900.00, mileage: 44800, payMethod: 'Financing', city: 'Garland', state: 'TX', deliveryStatus: 'Pending' },
  { saleId: 81, saleDate: 'INVALID', model: 'Cayenne Coupe', modelYear: 2024, price: 111000.00, mileage: 6700, payMethod: 'Bank Transfer', city: 'Irving', state: 'TX', deliveryStatus: 'In Transit' },
  { saleId: 82, saleDate: '2026-12-11', model: '911 Targa 4S', modelYear: 2023, price: 156500.00, mileage: 4200, payMethod: 'Cash', city: 'Chesapeake', state: 'VA', deliveryStatus: 'Delivered' },
  { saleId: 83, saleDate: '2026-12-24', model: 'Taycan', modelYear: 2025, price: 119900.00, mileage: 1250, payMethod: 'Lease', city: 'Scottsdale', state: 'AZ', deliveryStatus: 'Pending' },
  { saleId: 84, saleDate: 'INVALID', model: 'Macan T', modelYear: 2022, price: 73200.00, mileage: 18600, payMethod: 'Wire Transfer', city: 'Norfolk', state: 'VA', deliveryStatus: 'Delivered' },
  { saleId: 85, saleDate: '2026-12-28', model: '911 GT3', modelYear: 2024, price: 224000.00, mileage: 3000, payMethod: 'Wire Transfer', city: 'Boise', state: 'ID', deliveryStatus: 'Awaiting Delivery' },
  { saleId: 86, saleDate: '2027-01-15', model: '911 Carrera', modelYear: 2024, price: 126900.00, mileage: 7200, payMethod: 'Credit Card', city: 'Orlando', state: 'FL', deliveryStatus: 'Delivered' },
  { saleId: 87, saleDate: '2027-01-29', model: 'Cayenne', modelYear: 2023, price: 84500.00, mileage: 21400, payMethod: 'Bank Transfer', city: 'San Jose', state: 'CA', deliveryStatus: 'Pending' },
  { saleId: 88, saleDate: '2027-02-11', model: 'Macan S', modelYear: 2022, price: 69800.00, mileage: 26300, payMethod: 'Financing', city: 'Tampa', state: 'FL', deliveryStatus: 'Delivered' },
  { saleId: 89, saleDate: 'INVALID', model: 'Taycan 4S', modelYear: 2025, price: 132700.00, mileage: 0, payMethod: 'Wire Transfer', city: 'Denver', state: 'CO', deliveryStatus: 'In Transit' },
  { saleId: 90, saleDate: '2027-03-05', model: 'Panamera', modelYear: 2021, price: 81000.00, mileage: 42, payMethod: 'Cash', city: 'Austin', state: 'TX', deliveryStatus: 'Delivered' },
  { saleId: 91, saleDate: '2027-03-18', model: '718 Cayman', modelYear: 2023, price: 78900.00, mileage: 17500, payMethod: 'Debit Card', city: 'Seattle', state: 'WA', deliveryStatus: 'Cancelled' },
  { saleId: 92, saleDate: '2027-04-02', model: '911 Turbo S', modelYear: 2026, price: 249300.00, mileage: 900, payMethod: 'Wire Transfer', city: 'Boston', state: 'MA', deliveryStatus: 'Awaiting Delivery' },
  { saleId: 93, saleDate: 'INVALID', model: 'Cayenne Coupe', modelYear: 2024, price: 108750.00, mileage: 5530, payMethod: 'Wire Transfer', city: 'Phoenix', state: 'AZ', deliveryStatus: 'Pending Approval' },
  { saleId: 94, saleDate: 'INVALID', model: 'Macan Electric', modelYear: 2026, price: 92600.00, mileage: 0, payMethod: 'Financing', city: 'Chicago', state: 'IL', deliveryStatus: 'Shipped' },
  { saleId: 95, saleDate: '2027-05-12', model: 'Taycan Turbo', modelYear: 2025, price: 164000.00, mileage: 0, payMethod: 'ACH Payment', city: 'Dallas', state: 'TX', deliveryStatus: 'In Transit' },
  { saleId: 96, saleDate: '2027-05-27', model: 'Panamera 4S', modelYear: 2024, price: 119000.00, mileage: 13400, payMethod: 'Credit Card', city: 'San Francisco', state: 'CA', deliveryStatus: 'Delivered' },
  { saleId: 97, saleDate: 'INVALID', model: '911 GT3', modelYear: 2026, price: 232500.00, mileage: 1700, payMethod: 'Wire Transfer', city: 'Las Vegas', state: 'NV', deliveryStatus: 'Pending' },
  { saleId: 98, saleDate: '2027-06-18', model: 'Cayenne E-Hybrid', modelYear: 2023, price: 96800.00, mileage: 14000, payMethod: 'Lease', city: 'Charlotte', state: 'NC', deliveryStatus: 'Delivered' },
  { saleId: 99, saleDate: '2027-07-03', model: 'Macan T', modelYear: 2022, price: 74400.00, mileage: 20750, payMethod: 'Cash', city: 'Mesa', state: 'AZ', deliveryStatus: 'Awaiting Pickup' },
  { saleId: 100, saleDate: '2027-07-22', model: 'Taycan GTS', modelYear: 2025, price: 148500.00, mileage: 5200, payMethod: 'Crypto Payment', city: 'Atlanta', state: 'GA', deliveryStatus: 'Delivered' },
  { saleId: 101, saleDate: '2027-08-08', model: '718 Boxster', modelYear: 2021, price: 71900.00, mileage: 29600, payMethod: 'Bank Transfer', city: 'Long Beach', state: 'CA', deliveryStatus: 'Pending' },
  { saleId: 102, saleDate: 'INVALID', model: '911 Targa 4', modelYear: 2024, price: 143250.00, mileage: 3100, payMethod: 'Financing', city: 'Oakland', state: 'CA', deliveryStatus: 'In Transit' },
  { saleId: 103, saleDate: '2027-09-19', model: 'Panamera Turbo', modelYear: 2020, price: 137500.00, mileage: 48000, payMethod: 'Wire Transfer', city: 'Tulsa', state: 'OK', deliveryStatus: 'Delivered' },
  { saleId: 104, saleDate: '2027-09-25', model: 'Cayenne Turbo GT', modelYear: 2025, price: 204800.00, mileage: 3300, payMethod: 'Credit Card', city: 'Wichita', state: 'KS', deliveryStatus: 'Pending' },
  { saleId: 105, saleDate: '2027-10-01', model: '911 Dakar', modelYear: 2024, price: 271700.00, mileage: 1050, payMethod: 'Lease', city: 'New Orleans', state: 'LA', deliveryStatus: 'Delivered' }
];

export function getModelFamily(model: string): string {
  const m = model.toLowerCase();
  if (m.includes('911')) return '911';
  if (m.includes('718') || m.includes('boxster') || m.includes('cayman') || m.includes('spyder')) return '718 Cayman/Boxster';
  if (m.includes('cayenne')) return 'Cayenne';
  if (m.includes('macan')) return 'Macan';
  if (m.includes('taycan')) return 'Taycan';
  if (m.includes('panamera')) return 'Panamera';
  return 'Outros';
}

export function getPorscheSales(): PorscheSale[] {
  return rawPorscheSales.map(sale => ({
    ...sale,
    family: getModelFamily(sale.model)
  }));
}
