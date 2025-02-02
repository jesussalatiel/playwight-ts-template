/**
 * element-utils.ts: This module provides utility functions for retrieving text from web elements in web page and conditional statements with in Playwright.
 * These utilities include a variety of functions for retrieving text, input values, URLs, and checking conditions such as
 * whether an element is visible or checked. It provides a layer of abstraction over Playwright's built-in methods for
 * interacting with elements, making it easier to perform common tasks and checks on web elements.
 */

import { Locator, test } from '@playwright/test';
import { logger } from '../setup/custom-logger';
import { TimeoutOption } from '../types/optional-parameter-types';
import { getAllLocators, getLocator } from './locator-utils';
import { INSTANT_TIMEOUT, SMALL_TIMEOUT } from '../constants/timeouts';
import { wait } from './page-utils';

/**
 * 1. Retreiving Data: Use these functions to retrieve text, values, and counts from web elements.
 * These functions can also be used in conditional statements to check the state of web elements.
 * These functions are not intended for use in assertions, unless the built-in Playwright assertions do not meet your criteria.
 */

/**
 * Returns the inner text of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The inner text of the Locator.
 */
export async function getText(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const locator = getLocator(input);
  return locator.innerText(options);
}

/**
 * Returns the inner text of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @returns {Promise<Array<string>>} - The inner text of all Locator objects.
 */
export async function getAllTexts(input: string | Locator): Promise<Array<string>> {
  const locator = getLocator(input);
  return locator.allInnerTexts();
}

/**
 * Returns the input value of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The input value of the Locator.
 */
export async function getInputValue(input: string | Locator, options?: TimeoutOption): Promise<string> {
  const locator = getLocator(input);
  return locator.inputValue(options);
}

/**
 * Returns the input values of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<Array<string>>} - The input values of all Locator objects.
 */
export async function getAllInputValues(input: string | Locator, options?: TimeoutOption): Promise<Array<string>> {
  const locators = await getAllLocators(input);
  return Promise.all(locators.map(locator => getInputValue(locator, options)));
}

/**
 * Returns the attribute of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {string} attributeName - The name of the attribute to get.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<null | string>} - The attribute of the Locator if present or null if absent.
 */
export async function getAttribute(
  input: string | Locator,
  attributeName: string,
  options?: TimeoutOption,
): Promise<null | string> {
  const locator = getLocator(input);
  return locator.getAttribute(attributeName, options);
}

/**
 * Returns the count of Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<number>} - The count of the Locator objects.
 */
export async function getLocatorCount(input: string | Locator, options?: TimeoutOption): Promise<number> {
  const timeoutInMs = options?.timeout || INSTANT_TIMEOUT;
  try {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (await isElementAttached(input, { timeout: timeoutInMs })) {
      return (await getAllLocators(input)).length;
    }
  } catch (error) {
    logger.error(`getLocatorCount- ${error instanceof Error ? error.message : String(error)}`);
  }
  return 0;
}

/**
 * 2. Conditions: Use these checks within conditional statements.
 * They are not intended for use in assertions, unless the built-in Playwright assertions do not meet your criteria.
 */

/**
 * Checks if a Locator object is attached to DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is attached, false otherwise.
 */
export async function isElementAttached(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input); // Assuming getLocator returns a Playwright Locator
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;

  try {
    await locator.waitFor({ state: 'attached', timeout: timeoutInMs });
    return true;
  } catch (error) {
    logger.error(`isElementAttached- ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Checks if a Locator object is attached to DOM and is visible.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is visible, false otherwise.
 */
export async function isElementVisible(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      // eslint-disable-next-line no-await-in-loop
      if (await locator.isVisible(options)) {
        return true;
      }
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        setTimeout(resolve, 100);
      });
    }
  } catch (error) {
    logger.error(`isElementVisible- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is hidden or not present in DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is hidden, false otherwise.
 */
export async function isElementHidden(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      // eslint-disable-next-line no-await-in-loop
      if (await locator.isHidden(options)) {
        return true;
      }
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        setTimeout(resolve, 100);
      });
    }
  } catch (error) {
    logger.error(`isElementHidden- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is checked.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is checked, false otherwise.
 */
export async function isElementChecked(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  try {
    if (await isElementVisible(input, options)) {
      return await getLocator(input).isChecked(options);
    }
  } catch (error) {
    logger.error(`isElementChecked- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Waits for an element to be stable on the page.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves to a boolean indicating if the element is stable.
 */
export async function waitForElementToBeStable(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  let result = false;
  await test.step('waitForElementToBeStable', async () => {
    const locator = getLocator(input);
    const maxWaitTime = options?.timeout || SMALL_TIMEOUT;
    let stableCounter = 0;

    const initialBoundingBox = await locator.boundingBox();
    let lastX: number | null = initialBoundingBox?.x || null;
    let lastY: number | null = initialBoundingBox?.y || null;

    const startTime = Date.now();
    await wait(200);

    while (Date.now() - startTime < maxWaitTime) {
      // eslint-disable-next-line no-await-in-loop
      const { x, y } = (await locator.boundingBox()) || { x: null, y: null };

      if (x === lastX && y === lastY) {
        // eslint-disable-next-line no-plusplus
        stableCounter++;
        if (stableCounter >= 3) {
          result = true;
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        await wait(100);
      } else {
        // stableCounter = 0;
        // eslint-disable-next-line no-await-in-loop
        await wait(200);
      }

      lastX = x;
      lastY = y;
    }

    if (!result) {
      logger.error('Max wait time exceeded. Element is not stable.');
    }
  });
  return result;
}

/**
 * Waits for an element to be visible on the page.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is visible.
 */
export async function waitForElementToBeVisible(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'visible', timeout: options?.timeout || SMALL_TIMEOUT });
}

/**
 * Waits for an element to be hidden on the page or detached from the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is hidden.
 */
export async function waitForElementToBeHidden(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'hidden', timeout: options?.timeout || SMALL_TIMEOUT });
}

/**
 * Waits for an element to be attached to the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is attached to the DOM.
 */
export async function waitForElementToBeAttached(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'attached', timeout: options?.timeout || SMALL_TIMEOUT });
}

/**
 * Waits for an element to be detached from the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is detached from the DOM.
 */
export async function waitForElementToBeDetached(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'detached', timeout: options?.timeout || SMALL_TIMEOUT });
}
