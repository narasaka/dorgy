# dorgy 🐶

directory organizer (lmao)

## ???

exactly. this is me trying out deno. look away -- or don't.

https://user-images.githubusercontent.com/61931072/206535688-0fcccc1c-2fd9-4b5b-9c2c-4a243d993f1c.mov

## running

clone

```
git clone git@github.com:narasaka/dorgy.git
```

get into it yuh

```
cd dorgy
```

make config file

```
touch config.json
```

config.json should look something like this (see [config.json.example](https://github.com/narasaka/dorgy/blob/main/config.json.example) or below)

```
{
    "dirtyFolder": "/me/hello/dirty",
    "cleanFolder": "/me/hello/clean"
}
```

run it

```
deno run --allow-read --allow-write main.ts
```
