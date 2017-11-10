export enum TradeOfferState {
    INVALID = 'Invalid',
    ACTIVE = 'Active', // This trade offer has been sent, neither party has acted on it yet.
    ACCEPTED = 'Accepted', // The trade offer was accepted by the recipient and items were exchanged.
    COUNTERED = 'Countered', // The recipient made a counter offer
    EXPIRED = 'Expired', // The trade offer was not accepted before the expiration date
    CANCELED = 'Canceled', // The sender cancelled the offer
    DECLINED = 'Declined', // The recipient declined the offer
    INVALID_ITEMS = 'InvalidItems', // Some of the items in the offer are no longer available (indicated by the missing flag in the output)
    CREATE_NEEDS_CONFIRMATION = 'CreatedNeedsConfirmation', // The offer hasn't been sent yet and is awaiting further confirmation
    CANCELED_BY_SECOND_FACTOR = 'CanceledBySecondFactor', // Either party canceled the offer via email/mobile confirmation
    IN_ESCROW = 'InEscrow', // The trade has been placed on hold
}