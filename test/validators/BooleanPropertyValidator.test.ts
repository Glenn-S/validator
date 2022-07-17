import { BooleanPropertyValidator } from '../../src/validators';

describe('BooleanPropertyValidator', () => {
  describe('isTrue', () => {
    it('value of true should return no validation errors', () => {
      const validator = new BooleanPropertyValidator('prop', true, {});
      validator.isTrue();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value of false should return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', false, {});
      validator.isTrue();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('isTrue');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('value should have been true');
    });
  });

  describe('isFalse', () => {
    it('value of false should return no validation errors', () => {
      const validator = new BooleanPropertyValidator('prop', false, {});
      validator.isFalse();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value of true should return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', true, {});
      validator.isFalse();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('isFalse');
      expect(property).toBe('prop');
      expect(value).toBe('true');
      expect(description).toBe('value should have been false');
    });
  });

  describe('isNull', () => {
    it('value of null should return no validation error', () => {
      const testValue: boolean = null as unknown as boolean;
      const validator = new BooleanPropertyValidator('prop', testValue, {});
      validator.isNull();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value not null should return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', false, {});
      validator.isNull();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('isNull');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('value should have been null');
    });
  });

  describe('isUndefined', () => {
    it('value of undefined should return no validation error', () => {
      const testValue: boolean = undefined as unknown as boolean;
      const validator = new BooleanPropertyValidator('prop', testValue, {});
      validator.isUndefined();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value not undefined should return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', true, {});
      validator.isUndefined();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('isUndefined');
      expect(property).toBe('prop');
      expect(value).toBe('true');
      expect(description).toBe('value should have been undefined');
    });
  });

  describe('custom', () => {
    it('valid value should not return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', false, {});
      validator.custom((value) => {
        return value === true ?
          {
            error: 'custom',
            property: 'prop',
            value: 'false',
            description: '',
          } : null;
      });

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('invalid value should return validation error', () => {
      const validator = new BooleanPropertyValidator('prop', false, {});
      validator.custom((value) => {
        return value !== true ?
          {
            error: 'custom',
            property: 'prop',
            value: 'false',
            description: '',
          } : null;
      });

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('custom');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('');
    });
  });
});