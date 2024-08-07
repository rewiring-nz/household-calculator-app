/* tslint:disable */
/* eslint-disable */
/**
 * Household savings
 * This is the API for a household savings model. You can provide details about a household\'s energy use, and receive information about the household\'s potential emissions & cost savings from electrifying their fossil fuel machines, as well as the upfront costs of switching.
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * The household's home battery system
 * @export
 * @interface Battery
 */
export interface Battery {
    /**
     * Whether the household has battery
     * @type {boolean}
     * @memberof Battery
     */
    hasBattery: boolean;
    /**
     * The capacity of the battery system in kWh
     * @type {number}
     * @memberof Battery
     */
    capacity?: number;
    /**
     * The continuous power output of the battery system in kW
     * @type {number}
     * @memberof Battery
     */
    powerOutput?: number;
    /**
     * The peak power output of the battery system in kW
     * @type {number}
     * @memberof Battery
     */
    peakPowerOutput?: number;
    /**
     * Whether the household wants to install a battery
     * @type {boolean}
     * @memberof Battery
     */
    installBattery?: boolean;
}

/**
 * Check if a given object implements the Battery interface.
 */
export function instanceOfBattery(value: object): value is Battery {
    if (!('hasBattery' in value) || value['hasBattery'] === undefined) return false;
    return true;
}

export function BatteryFromJSON(json: any): Battery {
    return BatteryFromJSONTyped(json, false);
}

export function BatteryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Battery {
    if (json == null) {
        return json;
    }
    return {
        
        'hasBattery': json['hasBattery'],
        'capacity': json['capacity'] == null ? undefined : json['capacity'],
        'powerOutput': json['powerOutput'] == null ? undefined : json['powerOutput'],
        'peakPowerOutput': json['peakPowerOutput'] == null ? undefined : json['peakPowerOutput'],
        'installBattery': json['installBattery'] == null ? undefined : json['installBattery'],
    };
}

export function BatteryToJSON(value?: Battery | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'hasBattery': value['hasBattery'],
        'capacity': value['capacity'],
        'powerOutput': value['powerOutput'],
        'peakPowerOutput': value['peakPowerOutput'],
        'installBattery': value['installBattery'],
    };
}

