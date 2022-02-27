# Pokmon Comparison Tool API Documentation

The Pokemon Comparison Tool API provides information on what the valid Pokemon types are and
URL's which link to symbol images for each type.

## Gets a list of all Pokemon types

**Request Format:** /types

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a list of the Pokemon types on each line

**Example Request:** /types

**Example Response:**

```
bug
dark
dragon
electric
fairy
fighting
fire
flying
ghost
grass
ground
ice
normal
poison
psychic
rock
steel
water
```

**Error Handling:**

- Possible 500 (Server error) error (plaintext)
  - If the list maintainer leaves the list of Pokemon types as empty then it returns an error with
    the message `No types found in server`

## Get the image URL for a Pokemon type

**Request Format:** /image/:type

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON of the type name and image URL

**Example Request:** /image/dark

**Example Response:**

```json
{
  "name": "dark",
  "url": "https://i.imgur.com/yKjgV2Q.png"
}
```

**Error Handling:**

- Possible 400 (invalid request) error (json)
  - If passed in an invalid type, returns an error with the json: `{"error" : "type is an invalid type"}`
