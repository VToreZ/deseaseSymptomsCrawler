import { createCrawlerInstance, ONSuccess } from "@/customCrawler.js"
import { parseOmim } from "@/omimParser/omimParser.js"
import * as fs from "fs"

function addSymptomsToFile(diseaseName, symptoms)
{
  const rawData = fs.readFileSync('data.json')
  const newData = JSON.stringify({ ...rawData, ...{ [diseaseName]: symptoms } })
  fs.writeFileSync('data.json', newData)
}

const ids = ['162200']

parseOmim({ids})
