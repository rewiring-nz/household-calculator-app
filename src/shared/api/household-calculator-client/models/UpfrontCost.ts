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
 * The estimated total NZD cost of electrifying the household
 * @export
 * @interface UpfrontCost
 */
export interface UpfrontCost {
    /**
     * The estimated cost of installing solar in NZD
     * @type {number}
     * @memberof UpfrontCost
     */
    solar?: number;
    /**
     * The estimated cost of installing a battery in NZD
     * @type {number}
     * @memberof UpfrontCost
     */
    battery?: number;
    /**
     * The estimated cost of switching to cooktop in NZD
     * @type {number}
     * @memberof UpfrontCost
     */
    cooktop?: number;
    /**
     * The estimated cost of switching to waterHeating in NZD
     * @type {number}
     * @memberof UpfrontCost
     */
    waterHeating?: number;
    /**
     * The estimated cost of switching to spaceHeating in NZD
     * @type {number}
     * @memberof UpfrontCost
     */
    spaceHeating?: number;
}

/**
 * Check if a given object implements the UpfrontCost interface.
 */
export function instanceOfUpfrontCost(value: object): value is UpfrontCost {
    return true;
}

export function UpfrontCostFromJSON(json: any): UpfrontCost {
    return UpfrontCostFromJSONTyped(json, false);
}

export function UpfrontCostFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpfrontCost {
    if (json == null) {
        return json;
    }
    return {
        
        'solar': json['solar'] == null ? undefined : json['solar'],
        'battery': json['battery'] == null ? undefined : json['battery'],
        'cooktop': json['cooktop'] == null ? undefined : json['cooktop'],
        'waterHeating': json['waterHeating'] == null ? undefined : json['waterHeating'],
        'spaceHeating': json['spaceHeating'] == null ? undefined : json['spaceHeating'],
    };
}

export function UpfrontCostToJSON(value?: UpfrontCost | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'solar': value['solar'],
        'battery': value['battery'],
        'cooktop': value['cooktop'],
        'waterHeating': value['waterHeating'],
        'spaceHeating': value['spaceHeating'],
    };
}

