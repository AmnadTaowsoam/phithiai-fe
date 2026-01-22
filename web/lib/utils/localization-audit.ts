/**
 * Localization Audit Utility
 * Detects mixed-language issues and provides tools for i18n quality assurance
 */

export interface LocalizationIssue {
  id: string;
  type: 'mixed_language' | 'hardcoded_text' | 'missing_translation' | 'inconsistent_terminology' | 'rtl_mismatch' | 'formatting_issue';
  severity: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  column?: number;
  message: string;
  suggestion?: string;
}

export interface LocalizationAuditResult {
  totalIssues: number;
  errors: number;
  warnings: number;
  issues: LocalizationIssue[];
  summary: string;
}

export interface LocalizationAuditOptions {
  targetLanguages: string[];
  checkMixedLanguage: boolean;
  checkHardcodedText: boolean;
  checkRTL: boolean;
  checkFormatting: boolean;
}

// Common Thai characters that might appear in English text
const THAI_CHARACTERS = /[\u0E01-\u0E5B\u0E40-\u0E5B]/g; // Thai characters that shouldn't appear in English text
const ENGLISH_ONLY_PATTERNS = [
  /\b[A-Z]+\b/g, // Words in all caps
  /\b[A-Z][a-z]+\b/g, // CamelCase words
  /\b[A-Z]{3,}\b/g, // Abbreviations like USA, UK
];

// RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// Common formatting issues
const FORMATTING_PATTERNS = {
  inconsistentDateFormat: /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b/g,
  inconsistentNumberFormat: /,\s\d{3}\.\d{3}\b/g, // US format in European context
  inconsistentCurrency: /\$\s?\d{1,3}(?:,\d{3})*\s?[A-Z]{3}/g, // Currency symbol before amount
  inconsistentTimeFormat: /\b(?:AM|PM)\b/g, // AM/PM without spaces
};

/**
 * Check for mixed language issues (Thai characters in English text)
 */
export function checkMixedLanguage(text: string, targetLanguage: string = 'en'): boolean {
  if (targetLanguage === 'th') return false; // Thai can have Thai characters

  // Check for Thai characters in English text
  if (targetLanguage.startsWith('en') && THAI_CHARACTERS.test(text)) {
    return true;
  }

  return false;
}

/**
 * Check for hardcoded text that should be translated
 */
export function checkHardcodedText(text: string, translationKeys: string[]): boolean {
  // Check if text matches common hardcoded patterns
  const hardcodedPatterns = [
    /Please\s+(sign|login|register|contact)/i,
    /Welcome\s+to/i,
    /Thank\s+you/i,
    /Error\s+occurred/i,
    /Loading/i,
  ];

  return hardcodedPatterns.some((pattern) => pattern.test(text));
}

/**
 * Check for inconsistent terminology
 */
export function checkInconsistentTerminology(text: string, context: string): boolean {
  const inconsistentTerms: Record<string, string[]> = {
    payment: ['pay', 'checkout', 'purchase'],
    booking: ['book', 'reserve', 'schedule'],
    vendor: ['vendor', 'supplier', 'provider'],
  };

  const contextTerms = inconsistentTerms[context] || [];
  return contextTerms.some((term) => text.toLowerCase().includes(term));
}

/**
 * Check for RTL/LTR mismatch
 */
export function checkRTLMismatch(content: string, expectedDirection: 'ltr' | 'rtl'): boolean {
  const hasRTLChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFF]/.test(content);
  const hasLTRChars = /[\u0000-\u007F]/.test(content);

  if (expectedDirection === 'rtl' && !hasRTLChars && hasLTRChars) {
    return true;
  }

  if (expectedDirection === 'ltr' && hasRTLChars) {
    return true;
  }

  return false;
}

/**
 * Check for formatting issues
 */
export function checkFormattingIssues(text: string): string[] {
  const issues: string[] = [];

  // Check for inconsistent date formats
  if (FORMATTING_PATTERNS.inconsistentDateFormat.test(text)) {
    issues.push('inconsistent_date_format');
  }

  // Check for inconsistent number formats
  if (FORMATTING_PATTERNS.inconsistentNumberFormat.test(text)) {
    issues.push('inconsistent_number_format');
  }

  // Check for inconsistent currency format
  if (FORMATTING_PATTERNS.inconsistentCurrency.test(text)) {
    issues.push('inconsistent_currency_format');
  }

  // Check for inconsistent time format
  if (FORMATTING_PATTERNS.inconsistentTimeFormat.test(text)) {
    issues.push('inconsistent_time_format');
  }

  return issues;
}

/**
 * Run full localization audit on a file or content
 */
export function runLocalizationAudit(
  content: string,
  options: Partial<LocalizationAuditOptions> = {}
): LocalizationAuditResult {
  const issues: LocalizationIssue[] = [];
  const targetLanguages = options.targetLanguages || ['en', 'th'];
  const checkMixed = options.checkMixedLanguage !== false;
  const checkHardcoded = options.checkHardcodedText !== false;
  const checkRTL = options.checkRTL !== false;
  const checkFormatting = options.checkFormatting !== false;

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for mixed language
    if (checkMixed) {
      targetLanguages.forEach((lang) => {
        if (checkMixedLanguage(line, lang)) {
          issues.push({
            id: `mixed-language-${index}`,
            type: 'mixed_language',
            severity: 'error',
            file: 'content',
            line: index + 1,
            message: `Mixed language detected: Thai characters found in ${lang} text`,
            suggestion: 'Translate Thai text or remove Thai characters from English text',
          });
        }
      });
    }

    // Check for hardcoded text
    if (checkHardcoded) {
      const commonTranslations = [
        'Please sign in',
        'Welcome to Phithiai',
        'Thank you for your order',
        'Loading...',
        'Error occurred',
      ];

      commonTranslations.forEach((translation) => {
        if (checkHardcodedText(line, [translation])) {
          issues.push({
            id: `hardcoded-text-${index}`,
            type: 'hardcoded_text',
            severity: 'warning',
            file: 'content',
            line: index + 1,
            message: `Possible hardcoded text: "${line}"`,
            suggestion: 'Use i18n translation keys instead',
          });
        }
      });
    }

    // Check for formatting issues
    if (checkFormatting) {
      const formatIssues = checkFormattingIssues(line);
      formatIssues.forEach((issue) => {
        issues.push({
          id: `formatting-${issue}-${index}`,
          type: 'formatting_issue',
          severity: 'warning',
          file: 'content',
          line: index + 1,
          message: `Formatting issue detected: ${issue}`,
          suggestion: 'Use consistent formatting throughout the application',
        });
      });
    }
  });

  // Check RTL mismatch
  if (checkRTL) {
    const expectedRTL = targetLanguages.some((lang) => RTL_LANGUAGES.includes(lang));
    if (expectedRTL !== checkRTLMismatch(content, expectedRTL ? 'rtl' : 'ltr')) {
      issues.push({
        id: `rtl-mismatch-${lines.length}`,
        type: 'rtl_mismatch',
        severity: 'error',
        file: 'content',
        line: 0,
        message: 'RTL/LTR direction mismatch detected',
        suggestion: expectedRTL ? 'Use RTL layout for this language' : 'Use LTR layout for this language',
      });
    }
  }

  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;

  let summary = 'Localization audit completed';
  if (errors > 0) {
    summary = `Found ${errors} error${errors > 1 ? 's' : ''}`;
  } else if (warnings > 0) {
    summary = `Found ${warnings} warning${warnings > 1 ? 's' : ''}`;
  }

  return {
    totalIssues: issues.length,
    errors,
    warnings,
    issues,
    summary,
  };
}

/**
 * Generate a localization audit report
 */
export function generateLocalizationReport(result: LocalizationAuditResult): string {
  let report = `# Localization Audit Report\n\n`;
  report += `## Summary\n${result.summary}\n\n`;
  report += `## Statistics\n`;
  report += `- Total Issues: ${result.totalIssues}\n`;
  report += `- Errors: ${result.errors}\n`;
  report += `- Warnings: ${result.warnings}\n\n`;

  if (result.issues.length > 0) {
    report += `## Issues Found\n\n`;
    result.issues.forEach((issue, index) => {
      report += `### ${index + 1}. ${issue.type.toUpperCase()}\n`;
      report += `**Severity:** ${issue.severity.toUpperCase()}\n`;
      report += `**Location:** ${issue.file}:${issue.line}`;
      if (issue.column) report += `:${issue.column}`;
      report += `\n**Message:** ${issue.message}\n`;
      if (issue.suggestion) {
        report += `**Suggestion:** ${issue.suggestion}\n`;
      }
      report += '\n';
    });
  }

  return report;
}

/**
 * Get suggested fixes for localization issues
 */
export function getLocalizationFixes(issues: LocalizationIssue[]): Array<{
  issue: LocalizationIssue;
  fix: string;
  priority: 'high' | 'medium' | 'low';
}> {
  return issues.map((issue) => {
    let priority: 'high' | 'medium' | 'low' = 'medium';
    let fix = '';

    switch (issue.type) {
      case 'mixed_language':
        priority = 'high';
        fix = 'Replace Thai text with English translation or remove Thai characters';
        break;
      case 'hardcoded_text':
        priority = 'medium';
        fix = 'Replace hardcoded text with i18n translation key';
        break;
      case 'inconsistent_terminology':
        priority = 'low';
        fix = 'Use consistent terminology throughout the application';
        break;
      case 'rtl_mismatch':
        priority = 'high';
        fix = 'Use proper RTL/LTR layout for the language';
        break;
      case 'formatting_issue':
        priority = 'low';
        fix = 'Apply consistent formatting (date, number, currency, time)';
        break;
      case 'missing_translation':
        priority = 'high';
        fix = 'Add missing translation for target language';
        break;
    }

    return { issue, fix, priority };
  });
}

/**
 * Quick check for common localization issues
 */
export function quickLocalizationCheck(text: string): {
  hasIssues: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (checkMixedLanguage(text)) {
    issues.push('Mixed language detected');
  }

  if (checkHardcodedText(text, [])) {
    issues.push('Possible hardcoded text found');
  }

  const formattingIssues = checkFormattingIssues(text);
  issues.push(...formattingIssues);

  return {
    hasIssues: issues.length > 0,
    issues,
  };
}
