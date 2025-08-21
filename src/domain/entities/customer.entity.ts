export default class Customer {
    constructor(
        private readonly name: string,
        private readonly address?: string,
        private readonly city?: string,
        private readonly country?: string,
        private readonly postal_code?: string,
        private readonly id?: number,
    ) {}

    getId(): number | undefined{
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAddress(): string | undefined {
        return this.address;
    }

    getCity(): string | undefined {
        return this.city;
    }

    getCountry(): string | undefined {
        return this.country;
    }

    getPostalCode(): string | undefined {
        return this.postal_code;
    }
}