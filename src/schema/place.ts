import { Max, Min } from "class-validator";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { AuthorizedContext, Context } from "./context";

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

  @Field((_type) => Float)
  latitude!: number;

  @Field((_type) => Float)
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
  @Query((_returns) => Place, { nullable: true })
  async place(@Arg("id") id: string, @Ctx() ctx: Context) {
    if (!id) return null;
    return await ctx.prisma.place.findUnique({ where: { id: parseInt(id) } });
  }

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

  @Authorized()
  @Mutation((_returns) => Place, { nullable: true })
  async updatePlace(
    @Arg("id") id: string,
    @Arg("input") input: PlaceInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const placeId = parseInt(id, 10);
    const place = await ctx.prisma.place.findUnique({ where: { id: placeId } });

    if (place?.userId !== ctx.uid) return null;

    return await ctx.prisma.place.update({
      where: { id: placeId },
      data: {
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

  @Authorized()
  @Mutation((_returns) => Boolean, { nullable: false })
  async deletePlace(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
    const placeId = parseInt(id, 10);
    const place = await ctx.prisma.place.findUnique({ where: { id: placeId } });

    if (place?.userId !== ctx.uid) return false;

    await ctx.prisma.place.delete({
      where: { id: placeId },
    });

    return true;
  }
}
