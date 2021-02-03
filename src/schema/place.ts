import { Max, Min } from "class-validator";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { AuthorizedContext } from "./context";

@InputType()
class Coordinates {
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  longitude!: number;
}

@InputType()
class PlaceInput {
  @Field((_type) => String)
  placeName!: string;

  @Field((_type) => String)
  placeType!: string;

  @Field((_type) => String)
  description!: string;

  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => Coordinates)
  coordinates!: Coordinates;
}

@ObjectType()
class Place {
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => String)
  placeName!: string;

  @Field((_type) => String)
  placeType!: string;

  @Field((_type) => String)
  description!: string;

  @Field((_type) => String)
  address!: string;

  @Field((_type) => Int)
  latitude!: number;

  @Field((_type) => Int)
  longitude!: number;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split("/");
    return parts[parts.length - 1] ?? "";
  }
}

@Resolver()
export class PlaceResolver {
  @Authorized()
  @Mutation((_returns) => Place, { nullable: true })
  async createPlace(
    @Arg("input") input: PlaceInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    return await ctx.prisma.place.create({
      data: {
        userId: ctx.uid,
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        placeName: input.placeName,
        placeType: input.placeType,
        description: input.description,
      },
    });
  }
}
