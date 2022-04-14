
from django.http import HttpResponse
from django.template import Context, Template, loader
from django.shortcuts import render
import json

def cargarPrincipal(request):
	plantillaExterna = loader.get_template('principal.html')
	doc = plantillaExterna.render()
	return HttpResponse(doc)

def campeones(request):
	plantillaExterna = loader.get_template('campeones.html')
	doc = plantillaExterna.render()
	return HttpResponse(doc)

def jugador(request):
    from riotwatcher import LolWatcher, ApiError

    lol_watcher = LolWatcher('RGAPI-967341d3-9fe9-4612-9816-2afb104798bc')

    my_region = 'na1'

    me = lol_watcher.summoner.by_name(my_region, 'pseudonym117')
    print(me)

    my_ranked_stats = lol_watcher.league.by_summoner(my_region, me['id'])
    print(my_ranked_stats)


    versions = lol_watcher.data_dragon.versions_for_region(my_region)
    champions_version = versions['n']['champion']



    current_champ_list = lol_watcher.data_dragon.champions(champions_version)
    js_data = json.dumps(current_champ_list)

    plantillaExterna = loader.get_template('campeones.html')

    return HttpResponse(plantillaExterna.render({'my_data': js_data}))