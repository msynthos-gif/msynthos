/**
 * minijobLogic.js
 * 
 * Reines Berechnungsmodul für den deutschen Minijob- & Midijob-Rechner.
 * Konform mit den gesetzlichen Regelungen in Deutschland (§ 8 & § 20 SGB IV, § 6 SGB VI).
 * Beinhaltet die gesetzlichen Werte für 2024, 2025 sowie die 603-Euro-Grenze für 2026
 * (dynamisch gekoppelt an den gesetzlichen Mindestlohn von 13,90 €/h).
 */

// Gesetzliche Grenzwerte und Mindestlöhne nach Abrechnungsjahren
export const STATUTORY_VALUES = {
  '2026': {
    minijobLimit: 603.00,
    mindestlohn: 13.90,
    midijobLimit: 2000.00,
    label: '2026 (Grenze: 603 € | Mindestlohn: 13,90 €)',
    description: 'Gesetzliche Geringfügigkeitsgrenze 2026: 603,00 € / Monat',
  },
  '2025': {
    minijobLimit: 556.00,
    mindestlohn: 12.82,
    midijobLimit: 2000.00,
    label: '2025 (Grenze: 556 € | Mindestlohn: 12,82 €)',
    description: 'Gesetzliche Geringfügigkeitsgrenze 2025: 556,00 € / Monat',
  },
  '2024': {
    minijobLimit: 538.00,
    mindestlohn: 12.41,
    midijobLimit: 2000.00,
    label: '2024 (Grenze: 538 € | Mindestlohn: 12,41 €)',
    description: 'Gesetzliche Geringfügigkeitsgrenze 2024: 538,00 € / Monat',
  },
};

export const MINIJOB_LIMIT_2026 = 603.00;
export const MINIJOB_LIMIT_2025 = 556.00;
export const MINIJOB_LIMIT_2024 = 538.00;

// Standardgrenzen (Default: 2026)
export const MINIJOB_LIMIT = 603.00;
export const MIDIJOB_LIMIT = 2000.00;

// Beitragssätze Arbeitnehmer
export const RV_MINIJOB_EMPLOYEE_RATE = 0.036; // 3,6 % Eigenanteil Rentenversicherung (falls nicht befreit)
export const MIDIJOB_MIN_RATE = 0.11; // ~11 % Gleitzonen-Einstieg
export const MIDIJOB_MAX_RATE = 0.205; // ~20,5 % regulärer SV-Arbeitnehmeranteil

// Pauschale Arbeitgeberabgaben Gewerbe (~31,2 %)
export const EMPLOYER_GEWERBE_RATES = {
  rv: 0.15,      // 15,0 % Rentenversicherung
  kv: 0.13,      // 13,0 % Krankenversicherung (bei gesetzlich Versicherten)
  tax: 0.02,     // 2,0 % Pauschale Lohnsteuer (§ 40a EStG)
  umlagen: 0.012 // ~1,2 % Umlagen (U1 Lohnfortzahlung, U2 Mutterschutz, Insolvenzgeldumlage)
};
export const EMPLOYER_GEWERBE_TOTAL_RATE = 0.312; // ~31,2 %

// Pauschale Arbeitgeberabgaben Privathaushalt (~14,9 %)
export const EMPLOYER_HAUSHALT_TOTAL_RATE = 0.149; // ~14,9 %

/**
 * Rundet kaufmännisch auf 2 Dezimalstellen
 * @param {number} num 
 * @returns {number}
 */
export function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Formatiert Geldbeträge nach deutscher Währungsnorm (z. B. "603,00 €")
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Formatiert Prozentwerte nach deutscher Norm (z. B. "3,6 %")
 * @param {number} percent 
 * @returns {string}
 */
export function formatPercent(percent) {
  const safePercent = typeof percent === 'number' && !isNaN(percent) ? percent : 0;
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(safePercent) + ' %';
}

/**
 * Ermittelt den aktuellen Minijob-Grenzwert anhand des Abrechnungsjahres oder eines direkten Zahlenwerts
 * @param {string|number} yearOrLimit 
 * @returns {number}
 */
export function getMinijobLimit(yearOrLimit) {
  if (typeof yearOrLimit === 'number' && yearOrLimit > 0) {
    return yearOrLimit;
  }
  if (typeof yearOrLimit === 'string' && STATUTORY_VALUES[yearOrLimit]) {
    return STATUTORY_VALUES[yearOrLimit].minijobLimit;
  }
  return MINIJOB_LIMIT_2026;
}

/**
 * Hauptberechnungsfunktion für Minijob & Midijob
 * 
 * @param {number|string} bruttoInput - Bruttolohn in Euro
 * @param {boolean} [rvBefreit=false] - Ob ein Antrag auf Befreiung von der RV-Pflicht vorliegt
 * @param {string|number} [yearOrLimit='2026'] - Abrechnungsjahr ('2026', '2025', '2024') oder Grenzwert
 * @returns {Object} Detaillierte Berechnungsergebnisse
 */
export function calculateMinijob(bruttoInput, rvBefreit = false, yearOrLimit = '2026') {
  // Eingabe validieren und parsen
  const rawBrutto = typeof bruttoInput === 'string' 
    ? parseFloat(bruttoInput.replace(',', '.')) 
    : Number(bruttoInput);

  const brutto = isNaN(rawBrutto) || rawBrutto < 0 ? 0 : round2(rawBrutto);
  const isRvBefreit = Boolean(rvBefreit);
  const currentLimit = getMinijobLimit(yearOrLimit);
  const currentYear = typeof yearOrLimit === 'string' && STATUTORY_VALUES[yearOrLimit] ? yearOrLimit : '2026';
  const currentMindestlohn = STATUTORY_VALUES[currentYear]?.mindestlohn || 13.90;

  // Max. Arbeitsstunden bei Mindestlohn für das gewählte Limit
  const maxHoursAtLimit = round2(currentLimit / currentMindestlohn);
  const actualHoursAtMindestlohn = brutto > 0 ? round2(brutto / currentMindestlohn) : 0;

  // Fall 0: Brutto ist 0 €
  if (brutto <= 0) {
    return {
      gross: 0,
      net: 0,
      rvContribution: 0,
      kvContribution: 0,
      pvContribution: 0,
      avContribution: 0,
      totalDeductions: 0,
      effectiveRatePercent: 0,
      status: 'Kein Einkommen eingegeben',
      category: 'zero',
      rvBefreit: isRvBefreit,
      currentLimit,
      year: currentYear,
      mindestlohn: currentMindestlohn,
      maxHoursAtLimit,
      actualHoursAtMindestlohn: 0,
      formatted: {
        gross: formatCurrency(0),
        net: formatCurrency(0),
        rvContribution: formatCurrency(0),
        kvContribution: formatCurrency(0),
        pvContribution: formatCurrency(0),
        avContribution: formatCurrency(0),
        totalDeductions: formatCurrency(0),
        effectiveRate: formatPercent(0),
      },
      employerEstimate: {
        total: 0,
        rv: 0,
        kv: 0,
        tax: 0,
        umlagen: 0,
        formattedTotal: formatCurrency(0),
        formattedRv: formatCurrency(0),
        formattedKv: formatCurrency(0),
        formattedTax: formatCurrency(0),
        formattedUmlagen: formatCurrency(0),
        ratePercent: 31.2,
      },
    };
  }

  let rvContribution = 0;
  let kvContribution = 0;
  let pvContribution = 0;
  let avContribution = 0;
  let totalDeductions = 0;
  let status = '';
  let category = 'minijob';

  // Fall 1: Minijob (Brutto <= Grenzwert, z. B. 603,00 € in 2026)
  if (brutto <= currentLimit) {
    category = 'minijob';
    status = `Minijob (Geringfügig bis ${formatCurrency(currentLimit)})`;

    if (!isRvBefreit) {
      // 3,6 % gesetzlicher Eigenanteil zur Rentenversicherung
      rvContribution = round2(brutto * RV_MINIJOB_EMPLOYEE_RATE);
    } else {
      // Befreit gem. § 6 Abs. 1b SGB VI: 0 % Abzug, Netto = Brutto
      rvContribution = 0;
    }

    kvContribution = 0;
    pvContribution = 0;
    avContribution = 0;
    totalDeductions = rvContribution;
  } 
  // Fall 2: Midijob / Übergangsbereich (Grenzwert + 0,01 € bis 2.000,00 €)
  else if (brutto <= MIDIJOB_LIMIT) {
    category = 'midijob';
    status = 'Midijob (Übergangsbereich nach § 20 SGB IV)';

    // Gleitzonen-Formel: Gleitende Skala von ~11 % bis ~20,5 %
    const progress = (brutto - currentLimit) / (MIDIJOB_LIMIT - currentLimit);
    const midijobRate = MIDIJOB_MIN_RATE + progress * (MIDIJOB_MAX_RATE - MIDIJOB_MIN_RATE);
    
    totalDeductions = round2(brutto * midijobRate);

    // Aufteilung der Sozialversicherungsbeiträge (Standardanteile im Übergangsbereich)
    rvContribution = round2(totalDeductions * (9.3 / 20.5));
    kvContribution = round2(totalDeductions * (8.15 / 20.5));
    pvContribution = round2(totalDeductions * (2.2 / 20.5));
    avContribution = round2(totalDeductions - rvContribution - kvContribution - pvContribution);
    if (avContribution < 0) avContribution = 0;
  } 
  // Fall 3: Reguläre versicherungspflichtige Beschäftigung (> 2.000,00 €)
  else {
    category = 'regular';
    status = 'Reguläre versicherungspflichtige Beschäftigung';

    // Reguläre Sozialversicherungsabzüge für Arbeitnehmer (~20,95 %)
    rvContribution = round2(brutto * 0.093); // RV 9,3 %
    kvContribution = round2(brutto * 0.0815); // KV ca. 8,15 %
    pvContribution = round2(brutto * 0.022); // PV ca. 2,2 %
    avContribution = round2(brutto * 0.013); // AV ca. 1,3 %

    totalDeductions = round2(rvContribution + kvContribution + pvContribution + avContribution);
  }

  const net = round2(Math.max(0, brutto - totalDeductions));
  const effectiveRatePercent = brutto > 0 ? round2((totalDeductions / brutto) * 100) : 0;

  // Geschätzte Arbeitgeber-Pauschalabgaben für gewerbliche Minijobs (~31,2 %: 15% RV + 13% KV + 2% Steuer + 1,2% Umlagen)
  let employerEstimateTotal = 0;
  let employerRv = 0;
  let employerKv = 0;
  let employerTax = 0;
  let employerUmlagen = 0;

  if (category === 'minijob') {
    employerRv = round2(brutto * EMPLOYER_GEWERBE_RATES.rv);
    employerKv = round2(brutto * EMPLOYER_GEWERBE_RATES.kv);
    employerTax = round2(brutto * EMPLOYER_GEWERBE_RATES.tax);
    employerUmlagen = round2(brutto * EMPLOYER_GEWERBE_RATES.umlagen);
    employerEstimateTotal = round2(brutto * EMPLOYER_GEWERBE_TOTAL_RATE);
  } else {
    // Reguläre Arbeitgeber-Sozialabgaben (~20,95 %)
    employerRv = round2(brutto * 0.093);
    employerKv = round2(brutto * 0.0815);
    employerUmlagen = round2(brutto * 0.035);
    employerEstimateTotal = round2(brutto * 0.2095);
  }

  return {
    gross: brutto,
    net,
    rvContribution,
    kvContribution,
    pvContribution,
    avContribution,
    totalDeductions,
    effectiveRatePercent,
    status,
    category,
    rvBefreit: isRvBefreit,
    currentLimit,
    year: currentYear,
    mindestlohn: currentMindestlohn,
    maxHoursAtLimit,
    actualHoursAtMindestlohn,
    formatted: {
      gross: formatCurrency(brutto),
      net: formatCurrency(net),
      rvContribution: formatCurrency(rvContribution),
      kvContribution: formatCurrency(kvContribution),
      pvContribution: formatCurrency(pvContribution),
      avContribution: formatCurrency(avContribution),
      totalDeductions: formatCurrency(totalDeductions),
      effectiveRate: formatPercent(effectiveRatePercent),
    },
    employerEstimate: {
      total: employerEstimateTotal,
      rv: employerRv,
      kv: employerKv,
      tax: employerTax,
      umlagen: employerUmlagen,
      formattedTotal: formatCurrency(employerEstimateTotal),
      formattedRv: formatCurrency(employerRv),
      formattedKv: formatCurrency(employerKv),
      formattedTax: formatCurrency(employerTax),
      formattedUmlagen: formatCurrency(employerUmlagen),
      ratePercent: category === 'minijob' ? 31.2 : 20.95,
    },
  };
}
