/**
 * ENUM fuer Tage
 * @author Jasmin & Joy
 */
export enum TSDayOfWeek {
    MONTAG = <any> 'MONTAG',
    DIENSTAG = <any> 'DIENSTAG',
    MITTWOCH = <any> 'MITTWOCH',
    DONNERSTAG = <any> 'DONNERSTAG',
    FREITAG = <any> 'FREITAG',
    SAMSTAG = <any> 'SAMSTAG',
    SONNTAG = <any> 'SONNTAG'

}

/**
 * gibt alle Arbeitstage zurueck
 * @returns {Array<TSDayOfWeek>}
 */
export function getWeekdaysValues(): Array<TSDayOfWeek> {
    return [
        TSDayOfWeek.MONTAG,
        TSDayOfWeek.DIENSTAG,
        TSDayOfWeek.MITTWOCH,
        TSDayOfWeek.DONNERSTAG,
        TSDayOfWeek.FREITAG
    ];
}

/**
 * gint alle Tage zurueck
 * @returns {Array<TSDayOfWeek>}
 */
export function getAllDayValues(): Array<TSDayOfWeek> {
    return [
        TSDayOfWeek.MONTAG,
        TSDayOfWeek.DIENSTAG,
        TSDayOfWeek.MITTWOCH,
        TSDayOfWeek.DONNERSTAG,
        TSDayOfWeek.FREITAG,
        TSDayOfWeek.SAMSTAG,
        TSDayOfWeek.SONNTAG
    ];
}
